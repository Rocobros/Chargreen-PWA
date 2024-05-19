const express = require('express')
const router = express.Router()
const db = require('../db.js')
const bcrypt = require('bcryptjs')
const CheckUserNameAvailable = require('../utils/CheckUsernameAvailable.js')

// Obtener todas las credenciales
router.get('/', (req, res) => {
  db.query('SELECT * FROM credenciales', (error, results) => {
    if (error) {
      console.error('Error encontrado: ', error)
      return res
        .status(500)
        .json({ message: 'Error al obtener la información.' })
    }
    res.status(200).json(results)
  })
})

// Obtener una credencial por ID
router.get('/:id', (req, res) => {
  db.query(
    'SELECT * FROM credenciales WHERE Id = ?',
    [req.params.id],
    (error, results) => {
      if (error) {
        console.error('Error encontrado: ', error)
        return res
          .status(500)
          .json({ message: 'Error al obtener la información.' })
      }
      res.status(200).json(results[0])
    }
  )
})

// Crear una nueva credencial
router.post('/', async (req, res) => {
  const { Usuario, Contrasena } = req.body
  const hashedPassword = await bcrypt.hash(Contrasena, 10)
  CheckUserNameAvailable(Usuario).then((isAvailable) => {
    if (isAvailable === 0) {
      db.query(
        'INSERT INTO credenciales (Usuario, Contrasena) VALUES (?, ?)',
        [Usuario, hashedPassword],
        (error, results) => {
          if (error) {
            console.error('Error encontrado: ', error)
            return res
              .status(500)
              .json({ message: 'Error al crear la credencial.' })
          }
          return res.status(201).json({
            message: 'Credencial añadida correctamente',
            id: results.insertId,
          })
        }
      )
    } else {
      return res.status(409).json({ message: 'El usuario ya esta en uso' })
    }
  })
})

// Actualizar una credencial
router.put('/:id', async (req, res) => {
  const { Usuario, Contrasena } = req.body
  // Encripta la contraseña antes de actualizarla en la base de datos
  const hashedPassword = await bcrypt.hash(Contrasena, 10)

  db.query(
    'UPDATE credenciales SET Usuario = ?, Contrasena = ? WHERE Id = ?',
    [Usuario, hashedPassword, req.params.id],
    (error, results) => {
      if (error) {
        console.error('Error encontrado: ', error)
        return res
          .status(500)
          .json({ message: 'Error al actualizar la credencial.' })
      }
      res.status(200).send(`Credencial actualizada con ID: ${req.params.id}`)
    }
  )
})

// Eliminar una credencial
router.delete('/:id', (req, res) => {
  db.query(
    'DELETE FROM credenciales WHERE Id = ?',
    [req.params.id],
    (error, results) => {
      if (error) {
        console.error('Error encontrado: ', error)
        return res
          .status(500)
          .json({ message: 'Error al eliminar la credencial.' })
      }
      res.status(200).send(`Credencial eliminada con ID: ${req.params.id}`)
    }
  )
})

module.exports = router
