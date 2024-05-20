const express = require('express')
const router = express.Router()
const db = require('../db.js')
const CheckEmailAndPhoneAvailable = require('../utils/CheckEmailAndPhoneAvailable.js')
require('dotenv').config()
var nodemailer = require('nodemailer')

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM usuariosnormales', (error, results) => {
    if (error) {
      console.error('Error encontrado: ', error)
      return res
        .status(500)
        .json({ message: 'Error al obtener la información.' })
    }
    res.status(200).json(results)
  })
})

// Obtener un usuario por su Registro
router.get('/:registro', (req, res) => {
  db.query(
    'SELECT * FROM usuariosnormales WHERE Registro = ?',
    [req.params.registro],
    (error, results) => {
      if (error) {
        console.error('Error encontrado: ', error)
        return res
          .status(500)
          .json({ message: 'Error al obtener la información.' })
      }
      if (results.length > 0) {
        res.status(200).json(results[0])
      } else {
        res.status(404).json({ message: 'Usuario no encontrado.' })
      }
    }
  )
})

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const {
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    Celular,
    Correo,
    Credencial,
  } = req.body
  CheckEmailAndPhoneAvailable(Correo, Celular)
    .then((isAvailable) => {
      if (isAvailable === 0) {
        db.query(
          'INSERT INTO usuariosnormales (Nombre, ApellidoPaterno, ApellidoMaterno, Celular, Correo, Credencial) VALUES (?, ?, ?, ?, ?, ?)',
          [
            Nombre,
            ApellidoPaterno,
            ApellidoMaterno,
            Celular,
            Correo,
            Credencial,
          ],
          (error, results) => {
            if (error) {
              console.error('Error encontrado: ', error)
              return res
                .status(500)
                .json({ message: 'Error al crear el usuario.' })
            }

            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
              },
            })

            var mailOptions = {
              from: 'rocobros21@gmail.com',
              subject: 'Verifica tu cuenta para la app de Chargreen',
            }

            mailOptions.to = Correo

            db.query(
              `select registro as id from usuariosnormales where correo = "${Correo}"`,
              (err, data) => {
                if (err) {
                  console.log(err.message)
                  return res.status(404).end()
                }
                const id = data[0].id

                mailOptions.text = `Se ha creado un cuenta con esta direccion de Correo. 
                Ingresa al siguiente link para verificar el usuario y que puedas usar la aplicacion: 
                http://localhost:5173/verificar?id=${id}<br/>
                Si no has creado la cuenta haz caso omiso a este correo.`

                transporter.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    console.log(err)
                  }
                })
              }
            )

            return res.status(201).json({
              message: 'Usuario creado correctamente',
              Registro: results.insertId,
            })
          }
        )
      } else if (isAvailable === 1) {
        return res.status(409).json({ message: 'El correo ya esta registrado' })
      } else if (isAvailable === 2) {
        return res
          .status(409)
          .json({ message: 'El celular ya esta registrado' })
      }
    })
    .catch((err) => {
      console.error('Error al verificar el correo:', err)
    })
})

// Actualizar un usuario
router.put('/:registro', (req, res) => {
  const {
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    Celular,
    Correo,
    Tiempo,
    Nivel,
  } = req.body

  CheckEmailAndPhoneAvailable(Correo, Celular)
    .then((isAvailable) => {
      if (isAvailable === 0) {
        db.query(
          'UPDATE usuariosnormales SET Nombre = ?, ApellidoPaterno = ?, ApellidoMaterno = ?, Celular = ?, Correo = ?, Tiempo = ?, Nivel = ? WHERE Registro = ?',
          [
            Nombre,
            ApellidoPaterno,
            ApellidoMaterno,
            Celular,
            Correo,
            Tiempo,
            Nivel,
            req.params.registro,
          ],
          (error, results) => {
            if (error) {
              console.error('Error encontrado: ', error)
              return res
                .status(500)
                .json({ message: 'Error al actualizar el usuario.' })
            }
            res.status(200).json({
              message: 'Usuario actualizado correctamente',
            })
          }
        )
      } else if (isAvailable === 2) {
        return res
          .status(409)
          .json({ message: 'El celular ya esta registrado' })
      }
    })
    .catch((err) => {
      console.error('Error al verificar el correo:', err)
    })
})

// Actualizar tiempo de un usuario
router.put('/tiempo/:registro', (req, res) => {
  const { Tiempo } = req.body
  db.query(
    'UPDATE usuariosnormales SET Tiempo = ? WHERE Registro = ?',
    [Tiempo, req.params.registro],
    (error, results) => {
      if (error) {
        console.error('Error encontrado: ', error)
        return res
          .status(500)
          .json({ message: 'Error al actualizar el usuario.' })
      }
      res.status(200).json({
        message: 'Usuario actualizado correctamente',
      })
    }
  )
})

router.put('/verificar/:id', (req, res) => {
  db.query(
    'UPDATE usuariosnormales SET Estado = "A" WHERE Registro = ?',
    [req.params.id],
    (error, results) => {
      if (error) {
        console.error('Error encontrado: ', error)
        return res
          .status(500)
          .json({ message: 'Error al verificar el usuario.' })
      }
      res.status(200).json({
        message: 'Usuario verificado correctamente',
      })
    }
  )
})

// Eliminar un usuario
router.delete('/:registro', (req, res) => {
  db.query(
    'DELETE FROM usuariosnormales WHERE Registro = ?',
    [req.params.registro],
    (error, results) => {
      if (error) {
        console.error('Error encontrado: ', error)
        return res
          .status(500)
          .json({ message: 'Error al eliminar el usuario.' })
      }
      res.status(200).json({ message: 'Usuario eliminado correctamente' })
    }
  )
})

module.exports = router
