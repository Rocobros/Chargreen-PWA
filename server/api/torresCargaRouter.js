const router = require('express').Router()
const db = require('../db.js')

// Obtener todas las torres
router.get('/', (req, res) => {
    db.query(
        'SELECT `Id`, `Nombre`, ST_X(coordenadas) AS Latitud, ST_Y(coordenadas) AS Longitud, `UsuarioAdministrador` FROM `torrecarga`',
        (error, results) => {
            if (error) {
                console.error('Error encontrado: ', error)
                return res
                    .status(500)
                    .json({ message: 'Error al obtener la informacion. ' })
            }
            res.status(200).json(results)
        }
    )
})

// Obtener una torre por su ID
router.get('/:id', (req, res) => {
    db.query(
        'SELECT `Id`, `Nombre`, ST_X(coordenadas) AS Latitud, ST_Y(coordenadas) AS Longitud, `UsuarioAdministrador` FROM `torrecarga` WHERE Id = ?',
        [req.params.id],
        (error, results) => {
            if (error) {
                console.error('Error encontrado: ', error)
                return res
                    .status(500)
                    .json({ message: 'Error al obtener la informacion. ' })
            }
            res.status(200).json(results[0])
        }
    )
})

// Crear una nueva torre
router.post('/', (req, res) => {
    const { Nombre, Latitud, Longitud, UsuarioAdministrador } = req.body
    db.query(
        'INSERT INTO torrecarga (Nombre, Coordenadas, UsuarioAdministrador) VALUES (?, POINTFROMTEXT(?), ?)',
        [Nombre, `POINT(${Latitud} ${Longitud})`, UsuarioAdministrador],
        (error, results) => {
            if (error) {
                console.error('Error encontrado: ', error)
                return res
                    .status(500)
                    .json({ message: 'Error al obtener la informacion. ' })
            }
            res.status(201).json({
                message: 'Torre añadida correctamente',
                id: results.insertId,
            })
        }
    )
})

// Actualizar una torre
router.put('/:id', (req, res) => {
    const { Nombre, Latitud, Longitud, Administrador } = req.body
    db.query(
        'UPDATE torrecarga SET Nombre = ?, Coordenadas = POINTFROMTEXT(?), UsuarioAdministrador = ? WHERE Id = ?',
        [Nombre, `POINT(${Longitud} ${Latitud})`, Administrador, req.params.id],
        (error, results) => {
            if (error) {
                console.error('Error encontrado: ', error)
                return res
                    .status(500)
                    .json({ message: 'Error al obtener la informacion. ' })
            }
            res.status(200).send(`Torre actualizada con ID: ${req.params.id}`)
        }
    )
})

// Eliminar una torre
router.delete('/:id', (req, res) => {
    db.query(
        'DELETE FROM torrecarga WHERE Id = ?',
        [req.params.id],
        (error, results) => {
            if (error) {
                console.error('Error encontrado: ', error)
                return res
                    .status(500)
                    .json({ message: 'Error al obtener la informacion. ' })
            }
            res.status(200).send(`Torre eliminada con ID: ${req.params.id}`)
        }
    )
})

module.exports = router
