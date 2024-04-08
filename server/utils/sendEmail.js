require('dotenv').config()
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

var mailOptions = {
  from: 'rocobros21@gmail.com',
  subject: 'Intento de recuperar constraseña para la app Chargreen',
  
};

module.exports = {
    transporter,
    mailOptions
}