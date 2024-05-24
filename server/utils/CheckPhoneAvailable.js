const pool = require('../db')

async function CheckPhoneAvailable(celular, registro) {
  try {
    const [celularResults] = await pool.execute(
      'SELECT Registro FROM usuariosnormales WHERE Celular = ? AND Registro != ?',
      [celular, registro]
    )

    if (celularResults.length > 0) {
      return 1 // Celular duplicado
    }

    return 0 // Ninguno está duplicado
  } catch (err) {
    console.error('Error al consultar la base de datos:', err)
  }
}

module.exports = CheckPhoneAvailable
