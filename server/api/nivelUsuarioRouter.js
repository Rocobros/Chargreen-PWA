const express = require('express');
const router = express.Router();
const db = require('../db.js');

// Obtener todos los niveles de usuario
router.get('/', (req, res) => {
  db.query('SELECT * FROM nivelusuario', (error, results) => {
    if (error) {
      console.error("Error encontrado: ", error);
      return res.status(500).json({ message: "Error al obtener la información." });
    }
    res.status(200).json(results);
  });
});

// Obtener un nivel de usuario por ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM nivelusuario WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
      console.error("Error encontrado: ", error);
      return res.status(500).json({ message: "Error al obtener la información." });
    }
    res.status(200).json(results[0]);
  });
});

// Crear un nuevo nivel de usuario
router.post('/', (req, res) => {
  const Nivel = req.body;
  db.query('INSERT INTO nivelusuario SET ?',
  Nivel,
  (error, results) => {
    if (error) {
      console.error("Error encontrado: ", error);
      return res.status(500).json({ message: "Error al crear el nivel de usuario." });
    }
    res.status(201).json({message: "Nivel de usuario añadido correctamente", id: results.insertId});
  });
});

// Actualizar un nivel de usuario
router.put('/:id', (req, res) => {
  const { Nombre, CantidadMinima } = req.body;
  db.query(
    'UPDATE nivelusuario SET Nombre = ?, CantidadMinima = ? WHERE Id = ?',
    [Nombre, CantidadMinima, req.params.id],
    (error, results) => {
      if (error) {
        console.error("Error encontrado: ", error);
        return res.status(500).json({ message: "Error al actualizar el nivel de usuario." });
      }
      res.status(200).send(`Nivel de usuario actualizado con ID: ${req.params.id}`);
    }
  );
});

// Eliminar un nivel de usuario
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM nivelusuario WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
      console.error("Error encontrado: ", error);
      return res.status(500).json({ message: "Error al eliminar el nivel de usuario." });
    }
    res.status(200).send(`Nivel de usuario eliminado con ID: ${req.params.id}`);
  });
});

module.exports = router;
