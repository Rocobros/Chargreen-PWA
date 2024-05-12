const router = require('express').Router()
const db = require('../db.js')

// Obtener todas los tokens
router.get('/', (req, res) => {
  db.query('SELECT * FROM tokens', (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).json(results);
  });
});

// Obtener un token por su ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM tokens WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).json(results[0]);
  });
});

// Crear un nuevo token
router.post('/', (req, res) => {
  const token = req.body;
  db.query('INSERT INTO tokens SET ?', token, (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(201).json({message: "Token añadido correctamente", id: results.insertId});
  });
});

// Actualizar un Token
router.put('/:id', (req, res) => {
  const { Codigo, Estado, UsuarioNormal } = req.body;
  db.query(
    'UPDATE tokens SET Codigo = ?, Estado = ?, UsuarioNormal = ? WHERE Id = ?',
    [Codigo, Estado, UsuarioNormal, req.params.id],
    (error, results) => {
      if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
      res.status(200).send(`Token actualizado con ID: ${req.params.id}`);
    }
  );
});

// Actualizar el estado de un Token
router.put('/:id', (req, res) => {
  const { Estado } = req.body;
  db.query(
    'UPDATE tokens SET Estado = ? WHERE Id = ?',
    [Estado, req.params.id],
    (error, results) => {
      if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
      res.status(200).send(`Token actualizado con ID: ${req.params.id}`);
    }
  );
});

// Eliminar un Token
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM tokens WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).send(`Token eliminado con ID: ${req.params.id}`);
  });
});

module.exports = router