const express = require('express')
const router = express.Router()
const pool = require('../db.js')
const bcrypt = require('bcryptjs')
const CheckUserNameAvailable = require('../utils/CheckUsernameAvailable.js')
const authenticateToken = require('../utils/authenticateToken')

// Obtener todas las credenciales
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [results] = await pool.execute('SELECT * FROM credenciales')
    res.status(200).json(results)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

// Obtener una credencial por ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM credenciales WHERE Id = ?',
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

// Crear una nueva credencial
router.post('/', async (req, res) => {
  const { Usuario, Contrasena } = req.body
  try {
    const hashedPassword = await bcrypt.hash(Contrasena, 10)
    const isAvailable = await CheckUserNameAvailable(Usuario)

    if (isAvailable === 0) {
      const [results] = await pool.execute(
        'INSERT INTO credenciales (Usuario, Contrasena) VALUES (?, ?)',
        [Usuario, hashedPassword]
      )
      res.status(201).json({
        message: 'Credencial añadida correctamente',
        id: results.insertId,
      })
    } else {
      res.status(409).json({ message: 'El usuario ya está en uso' })
    }
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al crear la credencial.', error: error.message })
  }
})

// Actualizar una credencial
router.put('/:id', authenticateToken, async (req, res) => {
  const { Usuario, Contrasena } = req.body
  try {
    const hashedPassword = await bcrypt.hash(Contrasena, 10)
    await pool.execute(
      'UPDATE credenciales SET Usuario = ?, Contrasena = ? WHERE Id = ?',
      [Usuario, hashedPassword, req.params.id]
    )
    res.status(200).send(`Credencial actualizada con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al actualizar la credencial.',
      error: error.message,
    })
  }
})

// Eliminar una credencial
router.delete('/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM credenciales WHERE Id = ?', [req.params.id])
    res.status(200).send(`Credencial eliminada con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al eliminar la credencial.',
      error: error.message,
    })
  }
})

module.exports = router
