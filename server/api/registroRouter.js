const router = require('express').Router()
const db = require('../db.js')

// Obtener todos los registros
router.get('/', (req, res) => {
  db.query('SELECT * FROM registro', (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).json(results);
  });
});

// Obtener un registro por su ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM registro WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).json(results[0]);
  });
});

// Crear un nuevo registro
router.post('/', (req, res) => {
  const registro = req.body;
  db.query('INSERT INTO registro SET ?', registro, (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(201).json({message: "Registro añadido correctamente", id: results.insertId});
  });
});

// Actualizar un registro
router.put('/:id', (req, res) => {
  const { Estado, UsuarioNormal, Botellas, TorreCarga, Salida } = req.body;
  db.query(
    'UPDATE registro SET Titulo = ?, Descripcion = ?, Imagen = ?, UsuarioModerador = ?, Salida = ? WHERE Id = ?',
    [Estado, UsuarioNormal, Botellas, TorreCarga, Salida, req.params.id],
    (error, results) => {
      if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
      res.status(200).send(`Registro actualizado con ID: ${req.params.id}`);
    }
  );
});

//Desactivar el estado de los regsistros de un usuario
router.put('/desactivar/:id', (req, res) => {
  db.query(
    `UPDATE registro as r SET r.Estado = "D" WHERE r.Id IN (SELECT id FROM registro WHERE UsuarioNormal = ?)`,
    [req.params.id],
    (error, results) => {
      if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
      res.status(200).send(`Registros desactivados para usuario con ID: ${req.params.id}`);
    }
  );
});

// Eliminar un registro
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM registro WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).send(`Registro eliminado con ID: ${req.params.id}`);
  });
});

module.exports = router