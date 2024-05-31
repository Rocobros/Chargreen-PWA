const pool = require('../db')

async function getExitCode(data) {
  try {
    const [response] = await pool.execute(
      'SELECT Codigo FROM salidas WHERE TorreCarga = ? AND Numero = ?',
      [data.id, data.salida]
    )

    return response[0].Codigo
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = getExitCode
