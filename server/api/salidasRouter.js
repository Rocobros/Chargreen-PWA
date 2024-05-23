const express = require('express')
const router = express.Router()
const pool = require('../db.js')

// Obtener todas las salidas
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM salidas')
    res.status(200).json(results)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// Obtener una salida por ID
router.get('/:id', async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM salidas WHERE Id = ?', [
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

// Obtener las salidas disponibles de una torre
router.get('/disponibles/:id', async (req, res) => {
  try {
    const [results] = await pool.execute(
      "SELECT * FROM salidas WHERE TorreCarga = ? AND Estado = 'D'",
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

// Crear una nueva salida
router.post('/', async (req, res) => {
  const salida = req.body
  try {
    const [results] = await pool.execute('INSERT INTO salidas SET ?', salida)
    res.status(201).json({
      message: 'Salida añadida correctamente',
      id: results.insertId,
    })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al crear la salida.', error: error.message })
  }
})

// Actualizar una salida
router.put('/:id', async (req, res) => {
  const { Numero } = req.body
  try {
    await pool.execute('UPDATE salidas SET Numero = ? WHERE Id = ?', [
      Numero,
      req.params.id,
    ])
    res.status(200).send(`Salida actualizada con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al actualizar la salida.', error: error.message })
  }
})

// Mostrar salida activa
router.put('/activar/:id', async (req, res) => {
  try {
    await pool.execute("UPDATE salidas SET Estado = 'A' WHERE Id = ?", [
      req.params.id,
    ])
    res.status(200).send(`Estado de salida con ID: ${req.params.id} activado`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al activar la salida.', error: error.message })
  }
})

// Mostrar salida inactiva
router.put('/desactivar/:id', async (req, res) => {
  try {
    await pool.execute("UPDATE salidas SET Estado = 'D' WHERE Id = ?", [
      req.params.id,
    ])
    res
      .status(200)
      .send(`Estado de salida con ID: ${req.params.id} desactivado`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al desactivar la salida.', error: error.message })
  }
})

// Eliminar una salida
router.delete('/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM salidas WHERE Id = ?', [req.params.id])
    res.status(200).send(`Salida eliminada con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al eliminar la salida.', error: error.message })
  }
})

module.exports = router
