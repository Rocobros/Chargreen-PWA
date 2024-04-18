const router = require('express').Router()
const db = require('../db.js')

// Obtener todas las salidas
router.get('/', (req, res) => {
  db.query('SELECT * FROM salidas', (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).json(results);
  });
});

// Obtener una salida por ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM salidas WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).json(results[0]);
  });
});

// Crear una nueva salida
router.post('/', (req, res) => {
  const salida = req.body;
  db.query('INSERT INTO salidas SET = ?', salida, (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(201).json({message: "Salida añadida correctamente", id: results.insertId});
  });
});

// Actualizar una salida
router.put('/:id', (req, res) => {
  const { Numero } = req.body;
  db.query(
    'UPDATE salidas SET Numero = ? WHERE Id = ?',
    [Numero, req.params.id],
    (error, results) => {
      if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
      res.status(200).send(`Salida actualizada con ID: ${req.params.id}`);
    }
  );
});

// Eliminar una salida
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM salidas WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).send(`Salida eliminada con ID: ${req.params.id}`);
  });
});

module.exports = router