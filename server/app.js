const express = require('express')
const cors = require('cors')
const { transporter, mailOptions } = require('./utils/sendEmail')
const makeToken = require('./utils/makeToken')
const pool = require('./db.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const baseUrl = process.env.BASE_URL

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
const metricasRouter = require('./api/metricasRouter.js')

const requestLogger = require('./utils/requestLogger.js')

const authenticateToken = require('./utils/authenticateToken.js')
const JWT_SECRET = process.env.JWT_SECRET

const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/botellaslatas', authenticateToken, botellasLatasRouter)
app.use('/api/codigos', authenticateToken, codigosRouter)
app.use('/api/credenciales', credencialesRouter)
app.use('/api/nivelusuario', authenticateToken, nivelUsuarioRouter)
app.use('/api/novedades', authenticateToken, novedadesRouter)
app.use('/api/registro', authenticateToken, registroRouter)
app.use('/api/salidas', authenticateToken, salidasRouter)
app.use('/api/tokens', authenticateToken, tokensRouter)
app.use('/api/torres', authenticateToken, torreCargaRouter)
app.use('/api/admins', authenticateToken, adminRouter)
app.use('/api/moderadores', authenticateToken, moderRouter)
app.use('/api/usuarios', usuariosRouter)
app.use('/api/metricas', authenticateToken, metricasRouter)

app.post('/api/sendToEsp', authenticateToken, (req, res) => {
  const data = req.body
  app.locals
    .sendDataToEsp(JSON.stringify(data))
    .then(() => res.json({ message: 'Datos enviados al ESP.' }))
    .catch((error) => res.status(500).json({ message: error.message }))
})

//TODO: Check validations in api routers

app.get('/api/holamundo', async (req, res) => {
  let con
  try {
    con = await pool.getConnection()
  } catch (error) {
    return res.sendStatus(500)
  } finally {
    if (con) {
      con.release()
    }
  }
  return res.send('Hola mundo')
})

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y Contraseña requeridos' })
  }

  try {
    // Retrieve the hashed password from the database
    const [credentialsResult] = await pool.execute(
      'SELECT * FROM credenciales WHERE Usuario = ?',
      [username]
    )

    // Check if user is found
    if (credentialsResult.length > 0) {
      const user = credentialsResult[0]

      // Compare the provided password with the hashed password in the database
      const match = await bcrypt.compare(password, user.Contrasena)

      if (match) {
        // Password matches, proceed to check user role
        const credentialId = user.Id

        const [userResults] = await pool.execute(
          'SELECT * FROM usuariosnormales WHERE credencial = ?',
          [credentialId]
        )

        // Check if user is found in the users table
        if (userResults.length > 0) {
          if (userResults[0].Estado === 'D') {
            return res
              .status(401)
              .json({ message: 'La cuenta no esta verificada' })
          } else {
            const token = jwt.sign(
              { id: userResults[0].Registro, role: 'user' },
              JWT_SECRET,
              { expiresIn: '1h' }
            )
            return res.json({ token })
          }
        }

        // Check if the user might be an admin
        const [adminResults] = await pool.execute(
          'SELECT * FROM usuariosadministradores WHERE credencial = ?',
          [credentialId]
        )

        if (adminResults.length > 0) {
          const token = jwt.sign(
            { id: adminResults[0].Registro, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '1h' }
          )
          return res.json({ token })
        }

        // Check if the user might be a mod
        const [modResults] = await pool.execute(
          'SELECT * FROM usuariosmoderadores WHERE credencial = ?',
          [credentialId]
        )

        if (modResults.length > 0) {
          const token = jwt.sign(
            { id: modResults[0].Registro, role: 'mod' },
            JWT_SECRET,
            { expiresIn: '1h' }
          )
          return res.json({ token })
        }
      } else {
        // Password does not match
        return res
          .status(401)
          .json({ message: 'Contraseña incorrecta. Intente de nuevo' })
      }
    } else {
      // No user found
      return res
        .status(401)
        .json({ message: 'Usuario no registrado. Puede crear una cuenta' })
    }
  } catch (error) {
    console.error('Error querying the database:', error)
    return res
      .status(500)
      .json({ message: 'Error del servidor', error: error.message })
  }
})

app.post('/api/recuperar/:token/:id', async (req, res) => {
  const password = req.body.password
  const token = req.params.token
  const registro = req.params.id

  const activeToken = `select * from tokens where codigo = ? and usuarionormal = ? and estado = 'A'`

  try {
    const [data] = await pool.execute(activeToken, [token, registro])
    if (data.length > 0) {
      const getUser = `select credencial as id from usuariosnormales where registro = ?`
      const [userData] = await pool.execute(getUser, [registro])

      if (userData.length > 0) {
        const id = userData[0].id
        const hashedPassword = await bcrypt.hash(password, 10)
        const updatePassword = `update credenciales set Contrasena = ? where id = ?`

        await pool.execute(updatePassword, [hashedPassword, id])

        const deactivateToken = `update tokens set estado = 'D' where usuarionormal = ?`
        await pool.execute(deactivateToken, [registro])

        return res
          .status(200)
          .json({ message: 'Password updated successfully' })
      } else {
        return res.status(404).json({ error: 'User not found' })
      }
    } else {
      return res.status(400).json({ error: 'Invalid or inactive token' })
    }
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/mail', async (req, res) => {
  const { correo } = req.body
  mailOptions.to = correo

  const token = makeToken(10)

  const query = `select registro as id from usuariosnormales where correo = "${correo}"`

  try {
    const [data] = await pool.execute(query)
    if (data.length === 0) {
      return res.status(404).end()
    }

    const id = data[0].id
    mailOptions.text = `Se ha solicitado recuperar la contraseña de la cuenta vinculada a este correo. 
        Ingresa al siguiente link para actualizarla: ${baseUrl}/recuperar?token=${token}&id=${id} 
        Si no has solicitado este cambio has caso omiso al correo`

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        return res.json({
          error: error.message,
        })
      }
      const addToken =
        'insert into tokens(codigo, estado, usuarionormal) values (?,?,?)'
      const vals = [token, 'A', id]
      try {
        const [result] = await pool.execute(addToken, vals)
        return res.json(result)
      } catch (err) {
        console.log(err)
        return res.json('Error inserting to Token')
      }
    })
  } catch (err) {
    console.log(err.message)
    return res.status(404).end()
  }
})

module.exports = app
