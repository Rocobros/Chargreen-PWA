const express = require('express')
const router = express.Router()
const pool = require('../db.js')

// Obtener todos los registros
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM registro')
    res.status(200).json(results)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// Obtener un registro por su ID
router.get('/:id', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM registro WHERE Id = ?',
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

// Obtener los registros del ultimo mes por su ID
router.get('/month/:id', async (req, res) => {
  try {
    const [results] = await pool.execute(
      "SELECT COUNT(*) as botellas FROM registro WHERE DATE_FORMAT(Fecha, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m') AND UsuarioNormal = ?",
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

// Crear un nuevo registro
router.post('/', async (req, res) => {
  const registro = req.body
  try {
    const [results] = await pool.execute('INSERT INTO registro SET ?', registro)
    res.status(201).json({
      message: 'Registro añadido correctamente',
      id: results.insertId,
    })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al crear el registro.', error: error.message })
  }
})

// Actualizar un registro
router.put('/:id', async (req, res) => {
  const { UsuarioNormal, Botella, Salida } = req.body
  try {
    await pool.execute(
      'UPDATE registro SET UsuarioNormal = ?, Botella = ?, Salida = ? WHERE Id = ?',
      [UsuarioNormal, Botella, Salida, req.params.id]
    )
    res.status(200).send(`Registro actualizado con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al actualizar el registro.',
      error: error.message,
    })
  }
})

// Eliminar un registro
router.delete('/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM registro WHERE Id = ?', [req.params.id])
    res.status(200).send(`Registro eliminado con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al eliminar el registro.', error: error.message })
  }
})

module.exports = router
