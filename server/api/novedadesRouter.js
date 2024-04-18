const router = require('express').Router()
const db = require('../db.js')

// Obtener todas las novedades
router.get('/', (req, res) => {
  db.query('SELECT * FROM novedades', (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).json(results);
  });
});

// Obtener una novedad por su ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM novedades WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).json(results[0]);
  });
});

// Crear una nueva novedad
router.post('/', (req, res) => {
  const novedad = req.body;
  db.query('INSERT INTO novedades SET ?', novedad, (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(201).json({message: "Novedad añadida correctamente", id: results.insertId});
  });
});

// Actualizar una novedad
router.put('/:id', (req, res) => {
  const { Titulo, Descripcion, Imagen, UsuarioModerador } = req.body;
  db.query(
    'UPDATE novedades SET Titulo = ?, Descripcion = ?, Imagen = ?, UsuarioModerador = ? WHERE Id = ?',
    [Titulo, Descripcion, Imagen, UsuarioModerador, req.params.id],
    (error, results) => {
      if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
      res.status(200).send(`Novedad actualizada con ID: ${req.params.id}`);
    }
  );
});

// Eliminar una novedad
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM novedades WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).send(`Novedad eliminada con ID: ${req.params.id}`);
  });
});

module.exports = router