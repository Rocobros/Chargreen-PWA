const pool = require('../db')

async function crearRegistro(data) {
  try {
    const [results] = await pool.execute(
      'SELECT Id FROM salidas WHERE TorreCarga = ? AND Numero = ?',
      [data.id, data.salida]
    )
    const [result] = await pool.execute(
      'INSERT INTO `registro`(`Botella`, `Salida`, `Codigo`) VALUES (?, ?, ?)',
      [data.botella, results[0].Id]
    )
    const [code] = await pool.execute(
      'SELECT Codigo FROM salidas WHERE Id = ?',
      [results[0].Id]
    )
    await pool.execute("UPDATE salidas SET Estado = 'A' WHERE Id = ?", [
      results[0].Id,
    ])
    await pool.execute('UPDATE registro SET Codigo = ? WHERE Id = ?', [
      code[0].Codigo,
      result.insertId,
    ])
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = crearRegistro
