const pool = require('../db')

async function getExitCode(data){
	try {
		const [results] = await pool.execute(
      'SELECT Id FROM salidas WHERE TorreCarga = ? AND Numero = ?',
      [data.id, data.salida]
    )
		const [response] = await pool.execute("SELECT Codigo FROM salidas WHERE Id = ?", [results[0].Id])

		return response[0].Codigo
	} catch(error){

	}
}

module.exports = getExitCode