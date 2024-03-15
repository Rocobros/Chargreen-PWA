const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const {transporter, mailOptions} = require('./utils/sendEmail')
const makeToken = require('./utils/makeToken')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nueva_bd'
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
    const sql = "SELECT * FROM credenciales WHERE `usuario` = ? AND `contrasena` = ?"
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err){
            return res.json('Error querying from credentials table')
        }else{
            if(data.length > 0){
                return res.json('Success')
            }else{
                return res.json('No record')
            }
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

app.post('/recuperar/:token/:id', (req, res) => {
    const password = req.body[0].password[0]

    const token = req.params.token
    const registro = req.params.id

    const activeToken = `select * from tokens where codigo = "${token}" and usuarionormal = ${registro} and estado = 'A'`
    db.query(activeToken, (err, data) => {
        if(data){
            const getUser = `select credencial as id from usuariosnormales where registro = ${registro}`
            db.query(getUser, (err, data) => {
                const id = data[0].id
                
                const query = `update credenciales set Contrasena = "${password}" where id = ${id}`
                db.query(query);

                const deactivateToken = `update tokens set estado = 'D' where usuarionormal = ${registro}`
                db.query(deactivateToken)
            })
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

app.listen(8081, () => {
    console.log('Listening on URL: http://localhost:8081/')
})