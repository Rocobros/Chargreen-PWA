const pool = require('../db')

async function CheckTowerNameAvailable(name) {
  try {
    const [towerNames] = await pool.execute(
      'SELECT Nombre FROM torrecarga WHERE Nombre = ?',
      [name]
    )

    if (towerNames.length > 0) {
      return 1
    } else {
      return 0
    }
  } catch (err) {
    console.error('Error al consultar la base de datos:', err)
  }
}

module.exports = CheckTowerNameAvailable
