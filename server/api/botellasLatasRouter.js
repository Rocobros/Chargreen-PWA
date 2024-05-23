const express = require('express')
const router = express.Router()
const pool = require('../db.js')

// Obtener todas las botellas y latas
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM botellaslatas')
    res.status(200).json(results)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// Obtener una botella o lata por ID
router.get('/:id', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM botellaslatas WHERE Id = ?',
      [req.params.id]
    )
    if (results.length > 0) {
      res.status(200).json(results[0])
    } else {
      res.status(404).json({ message: 'Botella o lata no encontrada.' })
    }
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// Crear una nueva botella o lata
router.post('/', async (req, res) => {
  const botella = req.body
  try {
    const [results] = await pool.execute(
      'INSERT INTO botellaslatas SET ?',
      botella
    )
    res.status(201).json({
      message: 'Botella o lata añadida correctamente',
      id: results.insertId,
    })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al crear la botella o lata.',
      error: error.message,
    })
  }
})

// Actualizar una botella o lata
router.put('/:id', async (req, res) => {
  const { nombre, minutos, peso, altura } = req.body
  try {
    await pool.execute(
      'UPDATE botellaslatas SET Nombre = ?, Segundos = ?, Peso = ?, Altura = ? WHERE Id = ?',
      [nombre, minutos, peso, altura, req.params.id]
    )
    res.status(200).send(`Botella o lata actualizada con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al actualizar la botella o lata.',
      error: error.message,
    })
  }
})

// Eliminar una botella o lata
router.delete('/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM botellaslatas WHERE Id = ?', [
      req.params.id,
    ])
    res.status(200).send(`Botella o lata eliminada con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al eliminar la botella o lata.',
      error: error.message,
    })
  }
})

module.exports = router
