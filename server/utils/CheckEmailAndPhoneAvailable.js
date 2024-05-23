const pool = require('../db')

async function CheckEmailAvailable(email, celular) {
  try {
    const [emailResults] = await pool.execute(
      'SELECT Registro FROM usuariosnormales WHERE Correo = ?',
      [email]
    )

    if (emailResults.length > 0) {
      return 1 // Correo duplicado
    }

    const [celularResults] = await pool.execute(
      'SELECT Registro FROM usuariosnormales WHERE Celular = ?',
      [celular]
    )

    if (celularResults.length > 0) {
      return 2 // Celular duplicado
    }

    return 0 // Ninguno está duplicado
  } catch (err) {
    console.error('Error al consultar la base de datos:', err)
  }
}

module.exports = CheckEmailAvailable
