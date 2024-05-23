const express = require('express')
const router = express.Router()
const pool = require('../db.js')

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM usuariosadministradores'
    )
    res.status(200).json(results)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({
        message: 'Error al obtener la información.',
        error: error.message,
      })
  }
})

// Obtener un usuario por su Registro
router.get('/:registro', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM usuariosadministradores WHERE Registro = ?',
      [req.params.registro]
    )
    if (results.length > 0) {
      res.status(200).json(results[0])
    } else {
      res.status(404).json({ message: 'Admin no encontrado.' })
    }
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({
        message: 'Error al obtener la información.',
        error: error.message,
      })
  }
})

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const {
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    Celular,
    Correo,
    Credencial,
  } = req.body
  try {
    const [results] = await pool.execute(
      'INSERT INTO usuariosadministradores (Nombre, ApellidoPaterno, ApellidoMaterno, Celular, Correo, Credencial) VALUES (?, ?, ?, ?, ?, ?)',
      [Nombre, ApellidoPaterno, ApellidoMaterno, Celular, Correo, Credencial]
    )
    res.status(201).json({
      message: 'Admin creado correctamente',
      Registro: results.insertId,
    })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al crear el usuario.', error: error.message })
  }
})

// Actualizar un usuario
router.put('/:registro', async (req, res) => {
  const { Nombre, ApellidoPaterno, ApellidoMaterno, Celular, Correo } = req.body
  try {
    await pool.execute(
      'UPDATE usuariosadministradores SET Nombre = ?, ApellidoPaterno = ?, ApellidoMaterno = ?, Celular = ?, Correo = ? WHERE Registro = ?',
      [
        Nombre,
        ApellidoPaterno,
        ApellidoMaterno,
        Celular,
        Correo,
        req.params.registro,
      ]
    )
    res.status(200).json({ message: 'Admin actualizado correctamente' })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({
        message: 'Error al actualizar el usuario.',
        error: error.message,
      })
  }
})

// Eliminar un usuario
router.delete('/:registro', async (req, res) => {
  try {
    await pool.execute(
      'DELETE FROM usuariosadministradores WHERE Registro = ?',
      [req.params.registro]
    )
    res.status(200).json({ message: 'Admin eliminado correctamente' })
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al eliminar el usuario.', error: error.message })
  }
})

module.exports = router
