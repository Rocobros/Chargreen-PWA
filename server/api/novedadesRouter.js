const express = require('express')
const router = express.Router()
const pool = require('../db.js')

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

//TODO: Diferenciar POST para novedad y actualizacion
// Crear una nueva novedad
router.post('/', async (req, res) => {
  const { Tipo, Titulo, Descripcion, Imagen, Link, Admin } = req.body
  try {
    const [results] = await pool.execute(
      'INSERT INTO `novedades`(Tipo, Titulo, Descripcion, Imagen, Link, UsuarioModerador) VALUES (?)',
      [Tipo, Titulo, Descripcion, Imagen, Link, Admin]
    )
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
  const { Tipo, Titulo, Descripcion, Admin } = req.body
  try {
    const [results] = await pool.execute(
      'INSERT INTO `novedades`(Tipo, Titulo, Descripcion, UsuarioModerador) VALUES (?)',
      [Tipo, Titulo, Descripcion, Admin]
    )
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
