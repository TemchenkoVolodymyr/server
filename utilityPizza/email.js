// 1.  npm install nodemailer

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

  // Steps :
  // 1) Create a transporter
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "662f11d963b148",
      pass: "9908ad0cc2073d"
    }
  });
  // 2) Define the email options
  const mailOptions = {
    from: "Temchenko Volodymyr <from@example.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:options.html,
  }
  // 3) Actually send the email
  await transport.sendMail(mailOptions)
}

module.exports = sendEmail;