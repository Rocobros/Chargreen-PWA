const express = require('express')
const router = express.Router()
const pool = require('../db.js')
const CheckTowerName = require('../utils/CheckTowerNameAvailable.js')

// Obtener todas las torres
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT `Id`, `Nombre`, ST_X(coordenadas) AS Latitud, ST_Y(coordenadas) AS Longitud, `UsuarioAdministrador` FROM `torrecarga`'
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

// Obtener una torre por su ID
router.get('/:id', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT `Id`, `Nombre`, ST_X(coordenadas) AS Latitud, ST_Y(coordenadas) AS Longitud, `UsuarioAdministrador` FROM `torrecarga` WHERE Id = ?',
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

// Crear una nueva torre
router.post('/', async (req, res) => {
  const { Nombre, Latitud, Longitud, UsuarioAdministrador } = req.body
  try {
    const checkAvailable = await CheckTowerName(Nombre)
    if (checkAvailable === 0) {
      const [results] = await pool.execute(
        'INSERT INTO torrecarga (Nombre, Coordenadas, UsuarioAdministrador) VALUES (?, POINTFROMTEXT(?), ?)',
        [Nombre, `POINT(${Latitud} ${Longitud})`, UsuarioAdministrador]
      )
      res.status(201).json({
        message: 'Torre añadida correctamente',
        id: results.insertId,
      })
    } else {
      res.status(409).json({ message: 'El nombre ya se encuentra en uso' })
    }
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al crear la torre.', error: error.message })
  }
})

// Actualizar una torre
router.put('/:id', async (req, res) => {
  const { Nombre, Latitud, Longitud, UsuarioAdministrador } = req.body
  try {
    await pool.execute(
      'UPDATE torrecarga SET Nombre = ?, Coordenadas = POINTFROMTEXT(?), UsuarioAdministrador = ? WHERE Id = ?',
      [
        Nombre,
        `POINT(${Longitud} ${Latitud})`,
        UsuarioAdministrador,
        req.params.id,
      ]
    )
    res.status(200).send(`Torre actualizada con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al actualizar la torre.', error: error.message })
  }
})

// Eliminar una torre
router.delete('/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM torrecarga WHERE Id = ?', [req.params.id])
    res.status(200).send(`Torre eliminada con ID: ${req.params.id}`)
  } catch (error) {
    console.error('Error encontrado: ', error)
    res
      .status(500)
      .json({ message: 'Error al eliminar la torre.', error: error.message })
  }
})

module.exports = router
