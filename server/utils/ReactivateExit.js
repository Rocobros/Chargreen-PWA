const pool = require('../db')

async function ReactivateExit(data) {
  try {
    const [results] = await pool.execute(
      'SELECT Id FROM salidas WHERE TorreCarga = ? AND Numero = ?',
      [data.id, data.salida]
    )
    await pool.execute("UPDATE salidas SET Estado = 'D' WHERE Id = ?", [
      results[0].Id,
    ])
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = ReactivateExit
