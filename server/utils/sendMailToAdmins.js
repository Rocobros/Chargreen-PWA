require('dotenv').config()
var nodemailer = require('nodemailer')
const pool = require('../db')

async function sendMailToAdmins(data) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  var mailOptions = {
    from: 'rocobros21@gmail.com',
    subject: `Torre con Id ${data.id}`,
  }

  const [response] = await pool.execute(
    'SELECT Correo FROM usuariosadministradores'
  )
  const [mods] = await pool.execute("SELECT Correo FROM usuariosmoderadores")

  const joined = response.concat(mods)

  const correos = joined.map((row) => row.Correo).join(', ')

  mailOptions.to = correos

  const [torre] = await pool.execute(
    'SELECT Nombre FROM torrecarga WHERE Id = ?',
    [data.id]
  )
  const nombreTorre = torre[0].Nombre

  mailOptions.text = `La Torre #${data.id} con nombre: ${nombreTorre} se encuentra llena. 
	Por favor asegurate de que se vacie para que pueda seguir siendo utilizada`

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = sendMailToAdmins
