const db = require('../db')

async function CheckUserNameAvailable(usuario) {
  try {
    const [userResults] = await db
      .promise()
      .query('SELECT Id FROM credenciales WHERE Usuario = ?', [usuario])

    if (userResults.length > 0) {
      return 1 // Usuario duplicado
    }

    return 0 // No esta en uso
  } catch (err) {
    console.error('Error al consultar la base de datos:', err)
  }
}

module.exports = CheckUserNameAvailable
