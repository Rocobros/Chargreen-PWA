const pool = require('../db')

async function crearRegistro(data) {
  try {
    const [results] = await pool.execute(
      'SELECT Id FROM salidas WHERE TorreCarga = ? AND Numero = ?',
      [data.id, data.salida]
    )
    await pool.execute(
      'INSERT INTO `registro`(`Botella`, `Salida`) VALUES (?, ?)',
      [data.botella, results[0].Id]
    )
		await pool.execute(
      "UPDATE salidas SET Estado = 'A' WHERE Id = ?",
      [results[0].Id]
    )
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = crearRegistro
