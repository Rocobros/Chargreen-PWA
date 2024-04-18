const express = require('express');
const router = express.Router();
const db = require('../db.js');

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM usuariosmoderadores', (error, results) => {
    if (error) {
      console.error("Error encontrado: ", error);
      return res.status(500).json({ message: "Error al obtener la información." });
    }
    res.status(200).json(results);
  });
});

// Obtener un usuario por su Registro
router.get('/:registro', (req, res) => {
  db.query('SELECT * FROM usuariosmoderadores WHERE Registro = ?', [req.params.registro], (error, results) => {
    if (error) {
      console.error("Error encontrado: ", error);
      return res.status(500).json({ message: "Error al obtener la información." });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: "Moderador no encontrado." });
    }
  });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { Nombre, ApellidoPaterno, ApellidoMaterno, Celular, Correo, Credencial } = req.body;
  db.query(
    'INSERT INTO usuariosmoderadores (Nombre, ApellidoPaterno, ApellidoMaterno, Celular, Correo, Credencial) VALUES (?, ?, ?, ?, ?, ?)', 
    [Nombre, ApellidoPaterno, ApellidoMaterno, Celular, Correo, Credencial], 
    (error, results) => {
      if (error) {
        console.error("Error encontrado: ", error);
        return res.status(500).json({ message: "Error al crear el usuario." });
      }
      res.status(201).json({ message: "Moderador creado correctamente", Registro: results.insertId });
    }
  );
});

// Actualizar un usuario
router.put('/:registro', (req, res) => {
  const { Nombre, ApellidoPaterno, ApellidoMaterno, Celular, Correo } = req.body;
  db.query(
    'UPDATE usuariosmoderadores SET Nombre = ?, ApellidoPaterno = ?, ApellidoMaterno = ?, Celular = ?, Correo = ? WHERE Registro = ?',
    [Nombre, ApellidoPaterno, ApellidoMaterno, Celular, Correo, req.params.registro],
    (error, results) => {
      if (error) {
        console.error("Error encontrado: ", error);
        return res.status(500).json({ message: "Error al actualizar el usuario." });
      }
      res.status(200).json({ message: "Moderador actualizado correctamente" });
    }
  );
});

// Eliminar un usuario
router.delete('/:registro', (req, res) => {
  db.query('DELETE FROM usuariosmoderadores WHERE Registro = ?', [req.params.registro], (error, results) => {
    if (error) {
      console.error("Error encontrado: ", error);
      return res.status(500).json({ message: "Error al eliminar el usuario." });
    }
    res.status(200).json({ message: "Moderador eliminado correctamente" });
  });
});

module.exports = router;
