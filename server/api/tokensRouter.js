const express = require('express')
const router = express.Router()
const pool = require('../db.js')

// Obtener todos los tokens
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM tokens')
    res.status(200).json(results)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// Obtener un token por su ID
router.get('/:id', async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM tokens WHERE Id = ?', [
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

// Crear un nuevo token
router.post('/', async (req, res) => {
  const token = req.body
  try {
    const [results] = await pool.execute('INSERT INTO tokens SET ?', token)
    res
      .status(201)
      .json({ message: 'Token añadido correctamente', id: results.insertId })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al crear el token.', error: error.message })
  }
})

// Actualizar un Token
router.put('/:id', async (req, res) => {
  const { Codigo, Estado, UsuarioNormal } = req.body
  try {
    await pool.execute(
      'UPDATE tokens SET Codigo = ?, Estado = ?, UsuarioNormal = ? WHERE Id = ?',
      [Codigo, Estado, UsuarioNormal, req.params.id]
    )
    res.status(200).send(`Token actualizado con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al actualizar el token.', error: error.message })
  }
})

// Actualizar el estado de un Token
router.put('/:id', async (req, res) => {
  const { Estado } = req.body
  try {
    await pool.execute('UPDATE tokens SET Estado = ? WHERE Id = ?', [
      Estado,
      req.params.id,
    ])
    res.status(200).send(`Token actualizado con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al actualizar el estado del token.',
      error: error.message,
    })
  }
})

// Eliminar un Token
router.delete('/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM tokens WHERE Id = ?', [req.params.id])
    res.status(200).send(`Token eliminado con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al eliminar el token.', error: error.message })
  }
})

module.exports = router
