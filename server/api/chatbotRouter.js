const express = require('express')
const router = express.Router()
const pool = require('../db')

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
    const [results] = await pool.execute(
      'SELECT * FROM chatbot WHERE Id = ?',
      req.params.id
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

router.post('/', async (req, res) => {
  const ticket = req.body
  try {
    const [results] = await pool.execute(
      'INSERT INTO `chatbot`(`Pregunta`, `Respuesta`, `Estado`, `UsuarioModerador`, `UsuarioNormal`) VALUES (?, ?, ?, ?, ?)',
      [ticket.Pregunta, null, ticket.Estado, null, ticket.UsuarioNormal]
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

router.put('/:id', async (req, res) => {
  const ticket = req.body
  try {
    const [results] = await pool.execute(
      "UPDATE `chatbot` SET Respuesta = ?, Estado = 'R', UsuarioModerador = ?) WHERE Id = ?",
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

router.delete('/:id', (req, res) => {})

module.exports = router
