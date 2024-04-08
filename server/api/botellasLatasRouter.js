const router = require('express').Router()
const db = require('../db.js')

// Obtener todas las botellas y latas
router.get('/', (req, res) => {
  db.query('SELECT * FROM botellaslatas', (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).json(results);
  });
});

// Obtener una botella o lata por ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM botellaslatas WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).json(results[0]);
  });
});

// Crear una nueva botella o lata
router.post('/', (req, res) => {
  const botella = req.body;
  db.query('INSERT INTO botellaslatas SET ?', botella, (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(201).json({message: "Botella o lata añadida correctamente", id: results.insertId});
  });
});

// Actualizar una botella o lata
router.put('/:id', (req, res) => {
  const { nombre, minutos, peso, altura } = req.body;
  db.query(
    'UPDATE botellaslatas SET Nombre = ?, Minutos = ?, Peso = ?, Altura = ? WHERE Id = ?',
    [nombre, minutos, peso, altura, req.params.id],
    (error, results) => {
      if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
      res.status(200).send(`Botella o lata actualizada con ID: ${req.params.id}`);
    }
  );
});

// Eliminar una botella o lata
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM botellaslatas WHERE Id = ?', [req.params.id], (error, results) => {
    if (error) {
            console.error("Error encontrado: ", error);
            return res.status(500).json({ message: "Error al obtener la informacion. " });
        }
    res.status(200).send(`Botella o lata eliminada con ID: ${req.params.id}`);
  });
});

module.exports = router