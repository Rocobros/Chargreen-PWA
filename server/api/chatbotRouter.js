const express = require('express')
const router = express.Router()
const pool = require('../db')
const nodemailer = require('nodemailer')

router.get('/', async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM chatbot')
    res.status(200).json(results)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM chatbot WHERE Id = ?', [
      req.params.id,
    ])
    res.status(200).json(results[0])
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

router.get('/user/:id', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM chatbot WHERE UsuarioNormal = ?',
      [req.params.id]
    )
    res.status(200).json(results)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// router.get('/open', async (req, res) => {
//   try {
//     const [results] = await pool.execute(
//       "SELECT * FROM chatbot WHERE Estado = 'A'"
//     )
//     res.status(200).json({ message: 'Mensaje' })
//   } catch (error) {
//     console.error('Error encontrado: ', error)
//     res.status(500).json({
//       message: 'Error al obtener la información.',
//       error: error.message,
//     })
//   }
// })

router.post('/', async (req, res) => {
  const ticket = req.body
  try {
    const [results] = await pool.execute(
      'INSERT INTO `chatbot`(`Pregunta`, `Respuesta`, `Estado`, `UsuarioModerador`, `UsuarioNormal`) VALUES (?, ?, ?, ?, ?)',
      [ticket.Pregunta, null, ticket.Estado, null, ticket.UsuarioNormal]
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
      subject: 'Un usuario ha generado un nuevo ticket',
    }

    const [response] = await pool.execute(
      'SELECT Correo FROM usuariosmoderadores'
    )
    const correos = response.map((row) => row.Correo).join(', ')

    mailOptions.to = correos

    mailOptions.text = `Un usuario tiene una duda acerca del sistema. Ingresa al apartado de tickets para resolver su duda`

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
      }
    })

    res.status(201).json({
      message: 'Ticket creado correctamente',
      Id: results.insertId,
    })
  } catch (error) {
    console.error('Error encontrado: ', error)
    console.error('Error al verificar el correo:', error)
    res
      .status(500)
      .json({ message: 'Error al crear el ticket', error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  const ticket = req.body
  try {
    const [results] = await pool.execute(
      "UPDATE chatbot SET Respuesta = ?, Estado = 'R', UsuarioModerador = ?) WHERE Id = ?",
      [ticket.Respuesta, ticket.UsuarioModerador, req.params.id]
    )

    res.status(201).json({
      message: 'Ticket creado correctamente',
      Id: results.insertId,
    })
  } catch (error) {
    console.error('Error encontrado: ', error)
    console.error('Error al verificar el correo:', error)
    res
      .status(500)
      .json({ message: 'Error al crear el ticket', error: error.message })
  }
})

router.put('/responder/:id', async (req, res) => {
  const { Respuesta, UsuarioModerador } = req.body
  try {
    const [results] = await pool.execute(
      'UPDATE chatbot SET Respuesta = ?, UsuarioModerador = ?, Estado = ? WHERE Id = ?',
      [Respuesta, UsuarioModerador, 'R', req.params.id]
    )

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    const [ticket] = await pool.execute(
      'SELECT UsuarioNormal FROM chatbot WHERE Id = ?',
      [req.params.id]
    )
    const id = ticket.map((item) => item.UsuarioNormal)
    const [correo] = await pool.execute(
      "SELECT Correo FROM usuariosnormales WHERE Registro = ? AND Notificaciones = 'A'",
      [id[0]]
    )

    var mailOptions = {
      from: 'rocobros21@gmail.com',
      subject: `Ticket #${req.params.id} resuelto `,
    }

    mailOptions.to = correo[0].Correo
    mailOptions.text = `Se ha resuelto tu Ticket con Id #${req.params.id}. Dirigete a la seccion de Mis Tickets para ver la respuesta del moderador`

    if (correo) {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err)
        }
      })
    }

    res.status(201).json({
      message: 'Ticket respuesto correctamente',
    })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al crear el ticket', error: error.message })
  }
})

router.delete('/:id', (req, res) => {})

module.exports = router
