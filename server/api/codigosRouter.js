const router = require('express').Router()
const db = require('../db.js')

// Obtener todos los códigos
router.get('/', (req, res) => {
  db.query('SELECT * FROM codigos', (error, results) => {
    if (error) {
      console.error("Error encontrado: ", error);
      return res.status(500).json({ message: "Error al obtener la información." });
    }
    res.status(200).json(results);
  });
});

// Obtener un código por ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM codigos WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
      console.error("Error encontrado: ", error);
      return res.status(500).json({ message: "Error al obtener la información." });
    }
    res.status(200).json(results[0]);
  });
});

// Crear un nuevo código
router.post('/', (req, res) => {
  const codigo = req.body;
  db.query('INSERT INTO codigos SET ?', codigo, (error, results) => {
    if (error) {
      console.error("Error encontrado: ", error);
      return res.status(500).json({ message: "Error al obtener la información." });
    }
    res.status(201).json({message: "Código añadido correctamente", id: results.insertId});
  });
});

// Actualizar un código
router.put('/:id', (req, res) => {
  const { Codigo, TorreCarga, Salida } = req.body;
  db.query(
    'UPDATE codigos SET Codigo = ?, TorreCarga = ?, Salida = ? WHERE Id = ?',
    [Codigo, TorreCarga, Salida, req.params.id],
    (error, results) => {
      if (error) {
        console.error("Error encontrado: ", error);
        return res.status(500).json({ message: "Error al obtener la información." });
      }
      res.status(200).send(`Código actualizado con ID: ${req.params.id}`);
    }
  );
});

// Eliminar un código
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM codigos WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
      console.error("Error encontrado: ", error);
      return res.status(500).json({ message: "Error al obtener la información." });
    }
    res.status(200).send(`Código eliminado con ID: ${req.params.id}`);
  });
});

module.exports = router;
