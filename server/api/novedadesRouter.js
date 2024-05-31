const express = require('express')
const router = express.Router()
const pool = require('../db.js')
const nodemailer = require('nodemailer')

// Obtener todas las novedades
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM novedades')
    res.status(200).json(results)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

router.get('/ordered', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM novedades ORDER BY Fecha DESC'
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

// Obtener una novedad por su ID
router.get('/:id', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM novedades WHERE Id = ?',
      [req.params.id]
    )
    res.status(200).json(results[0])
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// Crear una nueva novedad
router.post('/', async (req, res) => {
  const { Titulo, Descripcion, Imagen, Link, UsuarioModerador } = req.body
  try {
    const [results] = await pool.execute(
      'INSERT INTO `novedades`(Tipo, Titulo, Descripcion, Imagen, Link, UsuarioModerador) VALUES (?, ?, ?, ?, ?, ?)',
      ['N', Titulo, Descripcion, Imagen, Link, UsuarioModerador]
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
      subject: 'Nueva novedad añadida en la app de Chargreen',
    }

    const [response] = await pool.execute(
      "SELECT Correo FROM usuariosnormales WHERE Notificaciones = 'A'"
    )
    const correos = response.map((row) => row.Correo).join(', ')

    mailOptions.to = correos

    mailOptions.text = `Se ha creado un creado una nueva novedad. Revisala en el apartado de Novedades en la app de Chargreen`

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
      }
    })

    res
      .status(201)
      .json({ message: 'Novedad añadida correctamente', id: results.insertId })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al crear la novedad.', error: error.message })
  }
})

// Crear una nueva actualizacion
router.post('/actualizacion', async (req, res) => {
  const { Titulo, Descripcion, UsuarioModerador } = req.body
  try {
    const [results] = await pool.execute(
      'INSERT INTO `novedades`(Tipo, Titulo, Descripcion, UsuarioModerador) VALUES (?, ?, ?, ?)',
      ['A', Titulo, Descripcion, UsuarioModerador]
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
      subject: 'Nueva actualizacion añadida en la app de Chargreen',
    }

    const [response] = await pool.execute(
      "SELECT Correo FROM usuariosnormales WHERE Notificaciones = 'A'"
    )
    const correos = response.map((row) => row.Correo).join(', ')

    mailOptions.to = correos

    mailOptions.text = `Se ha creado un creado una nueva actualizacion. Revisala en el apartado de Novedades en la app de Chargreen`

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
      }
    })

    res
      .status(201)
      .json({ message: 'Novedad añadida correctamente', id: results.insertId })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al crear la novedad.', error: error.message })
  }
})

// Actualizar una novedad
router.put('/:id', async (req, res) => {
  const { Titulo, Descripcion, Imagen, UsuarioModerador } = req.body
  try {
    await pool.execute(
      'UPDATE novedades SET Titulo = ?, Descripcion = ?, Imagen = ?, UsuarioModerador = ? WHERE Id = ?',
      [Titulo, Descripcion, Imagen, UsuarioModerador, req.params.id]
    )
    res.status(200).send(`Novedad actualizada con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al actualizar la novedad.',
      error: error.message,
    })
  }
})

// Eliminar una novedad
router.delete('/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM novedades WHERE Id = ?', [req.params.id])
    res.status(200).send(`Novedad eliminada con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al eliminar la novedad.', error: error.message })
  }
})

module.exports = router
