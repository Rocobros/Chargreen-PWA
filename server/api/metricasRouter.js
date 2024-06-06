const express = require('express')
const router = express.Router()
const pool = require('../db.js')

// Obtener todos los registros con detalles
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT registro.id as Id, registro.Fecha as Fecha, usuariosnormales.Registro as IdUsuario, credenciales.Usuario as Usuario, botellaslatas.Id as IdBotella, botellaslatas.Nombre as Botella, botellaslatas.Segundos as Segundos, torrecarga.Id as IdTorre, torrecarga.Nombre as Torre FROM registro INNER JOIN usuariosnormales ON registro.UsuarioNormal = usuariosnormales.Registro INNER JOIN botellaslatas ON registro.Botella = botellaslatas.Id INNER JOIN salidas ON registro.Salida = salidas.Id INNER JOIN torrecarga ON salidas.TorreCarga = torrecarga.Id INNER JOIN credenciales ON usuariosnormales.Credencial = credenciales.Id'
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

// Obtener un registro por su ID de usuario
router.get('/:id', async (req, res) => {
  try {
    const [results] = await pool.execute(
      'SELECT registro.id as Id, registro.Fecha as Fecha, usuariosnormales.Registro as IdUsuario, credenciales.Usuario as Usuario, botellaslatas.Id as IdBotella, botellaslatas.Nombre as Botella, botellaslatas.Segundos as Segundos, torrecarga.Id as IdTorre, torrecarga.Nombre as Torre FROM registro INNER JOIN usuariosnormales ON registro.UsuarioNormal = usuariosnormales.Registro INNER JOIN botellaslatas ON registro.Botella = botellaslatas.Id INNER JOIN salidas ON registro.Salida = salidas.Id INNER JOIN torrecarga ON salidas.TorreCarga = torrecarga.Id INNER JOIN credenciales ON usuariosnormales.Credencial = credenciales.Id WHERE usuariosnormales.Registro = ?',
      [req.params.id]
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

router.get('/progreso/:id', async (req, res) => {
  try {
    const [results] = await pool.execute(
      "SELECT COUNT(*) as botellas FROM registro WHERE Fecha >= DATE_FORMAT(CURDATE(), '%Y-%m-01') AND Fecha < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01') AND UsuarioNormal = ?",
      [req.params.id]
    )
    if (results) {
      res.status(200).json(results[0])
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    console.error('Error encontrado: ', error)
    res.status(500).json({
      message: 'Error al obtener la información.',
      error: error.message,
    })
  }
})

module.exports = router
