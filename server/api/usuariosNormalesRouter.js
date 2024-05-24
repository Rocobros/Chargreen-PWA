const express = require('express')
const router = express.Router()
const pool = require('../db')
const nodemailer = require('nodemailer')
const CheckEmailAvaiable = require('../utils/CheckEmailAndPhoneAvailable')
const CheckPhoneAvailable = require('../utils/CheckPhoneAvailable')
const authenticateToken = require('../utils/authenticateToken')
const baseUrl = process.env.BASE_URL

// Obtener todos los usuarios
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM usuariosnormales')
    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// Obtener un usuario por su Registro
router.get('/:registro', authenticateToken, async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM usuariosnormales WHERE Registro = ?',
      [req.params.registro]
    )
    if (results.length > 0) {
      res.status(200).json(results[0])
    } else {
      res.status(404).json({ message: 'Usuario no encontrado.' })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const {
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    Celular,
    Correo,
    Credencial,
  } = req.body

  try {
    const isAvailable = await CheckEmailAndPhoneAvailable(Correo, Celular)
    if (isAvailable === 0) {
      const [results] = await pool.execute(
        'INSERT INTO usuariosnormales (Nombre, ApellidoPaterno, ApellidoMaterno, Celular, Correo, Credencial) VALUES (?, ?, ?, ?, ?, ?)',
        [Nombre, ApellidoPaterno, ApellidoMaterno, Celular, Correo, Credencial]
      )

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      })

      var mailOptions = {
        from: 'rocobros21@gmail.com',
        subject: 'Verifica tu cuenta para la app de Chargreen',
      }

      mailOptions.to = Correo

      const [data] = await pool.execute(
        `SELECT registro as id FROM usuariosnormales WHERE correo = ?`,
        [Correo]
      )
      const id = data[0].id

      mailOptions.text = `Se ha creado un cuenta con esta direccion de Correo. 
        Ingresa al siguiente link para verificar el usuario y que puedas usar la aplicacion: 
        ${baseUrl}/verificar?id=${id}
        Si no has creado la cuenta haz caso omiso a este correo.`

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err)
        }
      })

      res.status(201).json({
        message: 'Usuario creado correctamente',
        Registro: results.insertId,
      })
    } else if (isAvailable === 1) {
      res.status(409).json({ message: 'El correo ya está registrado' })
    } else if (isAvailable === 2) {
      res.status(409).json({ message: 'El celular ya está registrado' })
    }
  } catch (error) {
    console.error('Error al verificar el correo:', error)
    res
      .status(500)
      .json({ message: 'Error al crear el usuario.', error: error.message })
  }
})

// Actualizar un usuario
router.put('/:registro', authenticateToken, async (req, res) => {
  const {
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    Celular,
    Correo,
    Tiempo,
    Nivel,
  } = req.body

  try {
    const isAvailable = await CheckPhoneAvailable(Celular, req.params.registro)
    console.log(isAvailable)
    if (isAvailable === 0) {
      await pool.execute(
        'UPDATE usuariosnormales SET Nombre = ?, ApellidoPaterno = ?, ApellidoMaterno = ?, Celular = ?, Correo = ?, Tiempo = ?, Nivel = ? WHERE Registro = ?',
        [
          Nombre,
          ApellidoPaterno,
          ApellidoMaterno,
          Celular,
          Correo,
          Tiempo,
          Nivel,
          req.params.registro,
        ]
      )
      res.status(200).json({ message: 'Usuario actualizado correctamente' })
    } else if (isAvailable === 2) {
      res.status(409).json({ message: 'El celular ya está registrado' })
    }
  } catch (error) {
    console.error('Error al verificar el correo:', error)
    res.status(500).json({
      message: 'Error al actualizar el usuario.',
      error: error.message,
    })
  }
})

// Actualizar tiempo de un usuario
router.put('/tiempo/:registro', authenticateToken, async (req, res) => {
  const { Tiempo } = req.body

  try {
    await pool.execute(
      'UPDATE usuariosnormales SET Tiempo = ? WHERE Registro = ?',
      [Tiempo, req.params.registro]
    )
    res.status(200).json({ message: 'Usuario actualizado correctamente' })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al actualizar el usuario.',
      error: error.message,
    })
  }
})

// Verificar un usuario
router.put('/verificar/:id', async (req, res) => {
  try {
    await pool.execute(
      'UPDATE usuariosnormales SET Estado = "A" WHERE Registro = ?',
      [req.params.id]
    )
    res.status(200).json({ message: 'Usuario verificado correctamente' })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al verificar el usuario.', error: error.message })
  }
})

// Eliminar un usuario
router.delete('/:registro', async (req, res) => {
  try {
    await pool.execute('DELETE FROM usuariosnormales WHERE Registro = ?', [
      req.params.registro,
    ])
    res.status(200).json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al eliminar el usuario.', error: error.message })
  }
})

module.exports = router
