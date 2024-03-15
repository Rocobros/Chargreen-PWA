var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rocobros21@gmail.com',
    pass: 'tikf twbs whfa sxna'
  }
});

var mailOptions = {
  from: 'rocobros21@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

module.exports = {
    transporter,
    mailOptions
}