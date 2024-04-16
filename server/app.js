const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const {transporter, mailOptions} = require('./utils/sendEmail')
const makeToken = require('./utils/makeToken')
const db = require('./db.js')

const botellasLatasRouter = require('./api/botellasLatasRouter.js');
const codigosRouter = require('./api/codigosRouter.js')
const credencialesRouter = require('./api/credencialesRouter.js')
const nivelUsuarioRouter = require('./api/nivelUsuarioRouter.js')
const usuariosNormalesRouter = require('./api/usuariosNormalesRouter.js')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/botellaslatas', botellasLatasRouter)
app.use('/api/codigos', codigosRouter)
app.use('/api/credenciales', credencialesRouter)
app.use('/api/nivelusuario', nivelUsuarioRouter)
app.use('/api/usuarios', usuariosNormalesRouter) 

app.post('/sendEsp', (req, res) => {
    const data = req.body;
    app.locals.sendDataToEsp(JSON.stringify(data))
    .then(() => res.json({ message: 'Datos enviados al ESP.' }))
    .catch((error) => res.status(500).json({ message: error.message }));
})

app.get('/fk', (req, res) => {
    const get_fk = 'SELECT MAX(id) AS id from credenciales'
    db.query(get_fk, (err, data) => {
        if(err){
            return res.json('Error')
        }
        return res.json(data[0])
    })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check credentials against the regular users table
    db.query('SELECT * FROM credenciales WHERE usuario = ? AND contrasena = ?', [username, password], (error, credentialsResult, fields) => {
        if (error) {
            console.error('Error querying regular users database:', error);
            return res.status(500).send('Internal Server Error');
        }
        // Check if user is found in the regular users table
        if (credentialsResult.length > 0) {
            const credentialId = credentialsResult[0].Id;

            db.query('SELECT * FROM usuariosnormales WHERE credencial = ?',credentialId, (error, userResults, fields) => {
                if (error) {
                    console.error('Error querying users table:', error);
                    return res.status(500).send('Internal Server Error');
                }

                // Check if user is found in the users table
                if (userResults.length > 0) { 
                    return res.json({ message: 'Login successful', role: 'user', id: userResults[0].Registro });
                }

                db.query('SELECT * FROM usuariosadministradores WHERE credencial = ?', credentialId, (error, adminResults, fields) => {
                    if (error) {
                        console.error('Error querying admins table:', error);
                        return res.status(500).send('Internal Server Error');
                    }

                    // Check if user is found in the users table
                    if (adminResults.length > 0) { 
                        return res.json({ message: 'Login successful', role: 'admin', id: adminResults[0].Registro});
                    }
                })
            })
        }else{
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    })
})

app.post('/register/credentials', (req, res) => {
    const credentials = 'INSERT INTO credenciales (`usuario`, `contrasena`) VALUES (?)'

    const values = [req.body.user[0], req.body.pass[0]]
    
    db.query(credentials, [values], (err,data) => {
        if(err){
            console.log(err)
            return res.json('Error inserting to Credentials')
        }
        return res.json(data)
    })
})

app.post('/register/user', (req, res) => {

    const sql = 'INSERT INTO `usuariosnormales`(`nombre`, `apellidopaterno`, `apellidomaterno`, `celular`, `correo`, `nivel`, `credencial`) VALUES (?)'
    const vals = [req.body.name[0], req.body.apep[0], req.body.apem[0], req.body.tel[0], req.body.email[0], 1, req.body.fk[0]]
    
    db.query(sql, [vals], (err, data) => {
        if(err){
            console.log(err)
            return res.json('Error inserting to Users')
        }
        return res.json(data)
    })
})

app.post('/register/moderator', (req, res) => {

    const sql = 'INSERT INTO `usuariosmoderadores`(`nombre`, `apellidopaterno`, `apellidomaterno`, `celular`, `correo`, `credencial`) VALUES (?)'
    const vals = [req.body.name[0], req.body.apep[0], req.body.apem[0], req.body.tel[0], req.body.email[0], req.body.fk[0]]
    
    db.query(sql, [vals], (err, data) => {
        if(err){
            console.log(err)
            return res.json('Error inserting to Users')
        }
        return res.json(data)
    })
})

app.get('/locations', (req, res) => {
  db.query('SELECT id, nombre, ST_X(coordenadas) AS latitud, ST_Y(coordenadas) AS longitud FROM torrecarga', (err, results) => {
    if (err) {
      console.error('Error getting locations: ' + err.stack);
      res.status(500).send('Error getting locations');
      return;
    }
    res.json(results);
  });
});

app.post('/register/tower', (req, res) => {
    const { nombre, latitud, longitud, admin } = req.body;
    const sql = 'INSERT INTO torrecarga (nombre, coordenadas, usuarioadministrador) VALUES (?, POINTFROMTEXT(?), ?)'
    const coordinates = `POINT(${latitud} ${longitud})`;

    const vals = [nombre, coordinates, admin]
    console.log(vals)

    db.query(sql, vals, (err, data) => {
        if(err){
            console.log(err)
            return res.json('Error inserting to Users')
        }
        return res.json(data)
    })
})

app.post('/recuperar/:token/:id', (req, res) => {
    const password = req.body[0].password[0]

    const token = req.params.token
    const registro = req.params.id

    const activeToken = `select * from tokens where codigo = "${token}" and usuarionormal = ${registro} and estado = 'A'`
    db.query(activeToken, (err, data) => {
        if(data.length > 0){
            const getUser = `select credencial as id from usuariosnormales where registro = ${registro}`
            db.query(getUser, (err, data) => {
                console.log(data)
                const id = data[0].id
                const query = `update credenciales set Contrasena = "${password}" where id = ${id}`
                db.query(query);

                const deactivateToken = `update tokens set estado = 'D' where usuarionormal = ${registro}`
                db.query(deactivateToken)
            })
        }else{
            res.status(400).end()
        }
    })
})

app.post('/mail', (req, res) => {
    const correo = req.body[0].correo
    mailOptions.to = correo

    const token = makeToken(10);

    const query = `select registro as id from usuariosnormales where correo = "${correo}"`
    db.query(query, (err, data) => {
        if(err){
            console.log(err.message)
            return res.status(404).end()
        }
        
        const id = data[0].id
        mailOptions.text = 
        `Se ha solicitado recuperar la contraseña de la cuenta vinculada a este correo<br/>
        Ingresa al siguiente link para actualizarla: http://localhost:5173/recuperar?token=${token}&id=${id}<br/>
        Si no has solicitado este cambio has caso omiso al correo`

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.json({
                    error: error.message
                })
            } 
            const addToken = 'insert into tokens(codigo, estado, usuarionormal) values (?)'
            const vals = [token, 'A', id]
            db.query(addToken, [vals], (err, data) => {
                if(err){
                    console.log(err)
                    return res.json('Error inserting to Token')
                }
                return res.json(data)
            })
        });
        
    })
})

module.exports = app