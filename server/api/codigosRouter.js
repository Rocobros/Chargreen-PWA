const express = require('express')
const router = express.Router()
const db = require('../db.js')

// Obtener todos los códigos
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM codigos')
    res.status(200).json(results)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// Obtener un código por ID
router.get('/:id', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM codigos WHERE Id = ?', [
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

// Crear un nuevo código
router.post('/', async (req, res) => {
  const codigo = req.body
  try {
    const [results] = await db.query('INSERT INTO codigos SET ?', codigo)
    res
      .status(201)
      .json({ message: 'Código añadido correctamente', id: results.insertId })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al crear el código.', error: error.message })
  }
})

// Actualizar un código
router.put('/:id', async (req, res) => {
  const { Codigo, TorreCarga, Salida } = req.body
  try {
    await db.query(
      'UPDATE codigos SET Codigo = ?, TorreCarga = ?, Salida = ? WHERE Id = ?',
      [Codigo, TorreCarga, Salida, req.params.id]
    )
    res.status(200).send(`Código actualizado con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al actualizar el código.', error: error.message })
  }
})

// Eliminar un código
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM codigos WHERE Id = ?', [req.params.id])
    res.status(200).send(`Código eliminado con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al eliminar el código.', error: error.message })
  }
})

module.exports = router
