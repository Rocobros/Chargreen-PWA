const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { transporter, mailOptions } = require('./utils/sendEmail')
const makeToken = require('./utils/makeToken')
const db = require('./db.js')
const bcrypt = require('bcryptjs')

const botellasLatasRouter = require('./api/botellasLatasRouter.js')
const codigosRouter = require('./api/codigosRouter.js')
const credencialesRouter = require('./api/credencialesRouter.js')
const nivelUsuarioRouter = require('./api/nivelUsuarioRouter.js')
const novedadesRouter = require('./api/novedadesRouter.js')
const registroRouter = require('./api/registroRouter.js')
const salidasRouter = require('./api/salidasRouter.js')
const tokensRouter = require('./api/tokensRouter.js')
const torreCargaRouter = require('./api/torresCargaRouter.js')
const adminRouter = require('./api/usuariosAdministradoresRouter.js')
const moderRouter = require('./api/usuariosModeradoresRouter.js')
const usuariosRouter = require('./api/usuariosNormalesRouter.js')
const requestLogger = require('./utils/requestLogger.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/botellaslatas', botellasLatasRouter)
app.use('/api/codigos', codigosRouter)
app.use('/api/credenciales', credencialesRouter)
app.use('/api/nivelusuario', nivelUsuarioRouter)
app.use('/api/novedades', novedadesRouter)
app.use('/api/registro', registroRouter)
app.use('/api/salidas', salidasRouter)
app.use('/api/tokens', tokensRouter)
app.use('/api/torres', torreCargaRouter)
app.use('/api/admins', adminRouter)
app.use('/api/moderadores', moderRouter)
app.use('/api/usuarios', usuariosRouter)

app.post('/api/sendToEsp', (req, res) => {
  const data = req.body
  app.locals
    .sendDataToEsp(JSON.stringify(data))
    .then(() => res.json({ message: 'Datos enviados al ESP.' }))
    .catch((error) => res.status(500).json({ message: error.message }))
})

app.get('/api/metricas/:id', (req, res) => {
  db.query(
    'SELECT registro.id as Id, registro.Fecha as Fecha, usuariosnormales.Registro as IdUsuario, botellaslatas.Id as IdBotella, botellaslatas.Nombre as Botella, botellaslatas.Segundos as Segundos, torrecarga.Id as IdTorre ,torrecarga.Nombre as Torre FROM registro INNER JOIN usuariosnormales ON registro.UsuarioNormal=usuariosnormales.Registro INNER JOIN botellaslatas ON registro.Botella=botellaslatas.Id INNER JOIN salidas ON registro.Salida=salidas.Id INNER JOIN torrecarga ON salidas.TorreCarga=torrecarga.Id WHERE usuariosnormales.Registro = ?',
    req.params.id,
    (error, results) => {
      if (error) {
        console.error('Error encontrado: ', error)
        return res
          .status(500)
          .json({ message: 'Error al obtener la informacion. ' })
      }
      res.status(200).json(results)
    }
  )
})

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y Contraseña requeridos' })
  }

  // Retrieve the hashed password from the database
  db.query(
    'SELECT * FROM credenciales WHERE Usuario = ?',
    [username],
    async (error, credentialsResult, fields) => {
      if (error) {
        console.error('Error querying the database:', error)
        return res.status(500).send('Error del servidor')
      }

      // Check if user is found
      if (credentialsResult.length > 0) {
        const user = credentialsResult[0]

        // Compare the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, user.Contrasena)

        if (match) {
          // Password matches, proceed to check user role
          const credentialId = user.Id

          db.query(
            'SELECT * FROM usuariosnormales WHERE credencial = ?',
            credentialId,
            (error, userResults, fields) => {
              if (error) {
                console.error('Error querying users table:', error)
                return res.status(500).send('Error del servidor')
              }

              // Check if user is found in the users table
              if (userResults.length > 0) {
                if (userResults[0].Estado === 'D') {
                  return res
                    .status(401)
                    .json({ message: 'La cuenta no esta verificada' })
                } else {
                  return res.json({
                    message: 'Login successful',
                    role: 'user',
                    id: userResults[0].Registro,
                  })
                }
              }

              // Check if the user might be an admin
              db.query(
                'SELECT * FROM usuariosadministradores WHERE credencial = ?',
                credentialId,
                (error, adminResults, fields) => {
                  if (error) {
                    console.error('Error en la tabla administradores:', error)
                    return res.status(500).send('Error del servidor')
                  }

                  if (adminResults.length > 0) {
                    return res.json({
                      message: 'Login successful',
                      role: 'admin',
                      id: adminResults[0].Registro,
                    })
                  }

                  // Check if the user might be a mod
                  db.query(
                    'SELECT * FROM usuariosmoderadores WHERE credencial = ?',
                    credentialId,
                    (error, modResults, fields) => {
                      if (error) {
                        console.error('Error en la tabla moderadores', error)
                        return res.status(500).send('Error del servidor')
                      }

                      if (modResults.length > 0) {
                        return res.json({
                          message: 'Login successful',
                          role: 'mod',
                          id: modResults[0].Registro,
                        })
                      } else {
                        // No user found in either table
                        return res.status(401).json({
                          message: 'El usuario no existe',
                        })
                      }
                    }
                  )
                }
              )
            }
          )
        } else {
          // Password does not match
          return res
            .status(401)
            .json({ message: 'Usuario o contraseña incorrectos' })
        }
      } else {
        // No user found
        return res
          .status(401)
          .json({ message: 'Usuario o contraseña incorrectos' })
      }
    }
  )
})

app.post('/api/recuperar/:token/:id', (req, res) => {
  const password = req.body[0].password[0]

  const token = req.params.token
  const registro = req.params.id

  const activeToken = `select * from tokens where codigo = "${token}" and usuarionormal = ${registro} and estado = 'A'`
  db.query(activeToken, (err, data) => {
    if (data.length > 0) {
      const getUser = `select credencial as id from usuariosnormales where registro = ${registro}`
      db.query(getUser, async (err, data) => {
        console.log(data)
        const id = data[0].id
        const hashedPassword = await bcrypt.hash(password, 10)
        const query = `update credenciales set Contrasena = "${hashedPassword}" where id = ${id}`
        db.query(query)

        const deactivateToken = `update tokens set estado = 'D' where usuarionormal = ${registro}`
        db.query(deactivateToken)
      })
    } else {
      res.status(400).end()
    }
  })
})

app.post('/api/mail', (req, res) => {
  const correo = req.body[0].correo
  mailOptions.to = correo

  const token = makeToken(10)

  const query = `select registro as id from usuariosnormales where correo = "${correo}"`
  db.query(query, (err, data) => {
    if (err) {
      console.log(err.message)
      return res.status(404).end()
    }

    const id = data[0].id
    mailOptions.text = `Se ha solicitado recuperar la contraseña de la cuenta vinculada a este correo<br/>
        Ingresa al siguiente link para actualizarla: http://localhost:5173/recuperar?token=${token}&id=${id}<br/>
        Si no has solicitado este cambio has caso omiso al correo`

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({
          error: error.message,
        })
      }
      const addToken =
        'insert into tokens(codigo, estado, usuarionormal) values (?)'
      const vals = [token, 'A', id]
      db.query(addToken, [vals], (err, data) => {
        if (err) {
          console.log(err)
          return res.json('Error inserting to Token')
        }
        return res.json(data)
      })
    })
  })
})

module.exports = app
