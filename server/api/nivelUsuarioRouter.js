const express = require('express')
const router = express.Router()
const pool = require('../db.js')

// Obtener todos los niveles de usuario
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM nivelusuario')
    res.status(200).json(results)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// Obtener un nivel de usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM nivelusuario WHERE Id = ?',
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

// Crear un nuevo nivel de usuario
router.post('/', async (req, res) => {
  const Nivel = req.body
  try {
    const [results] = await pool.execute(
      'INSERT INTO nivelusuario SET ?',
      Nivel
    )
    res.status(201).json({
      message: 'Nivel de usuario añadido correctamente',
      id: results.insertId,
    })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al crear el nivel de usuario.',
      error: error.message,
    })
  }
})

// Actualizar un nivel de usuario
router.put('/:id', async (req, res) => {
  const { Nombre, CantidadMinima } = req.body
  try {
    await pool.execute(
      'UPDATE nivelusuario SET Nombre = ?, CantidadMinima = ? WHERE Id = ?',
      [Nombre, CantidadMinima, req.params.id]
    )
    res
      .status(200)
      .send(`Nivel de usuario actualizado con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al actualizar el nivel de usuario.',
      error: error.message,
    })
  }
})

// Eliminar un nivel de usuario
router.delete('/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM nivelusuario WHERE Id = ?', [req.params.id])
    res.status(200).send(`Nivel de usuario eliminado con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al eliminar el nivel de usuario.',
      error: error.message,
    })
  }
})

module.exports = router
