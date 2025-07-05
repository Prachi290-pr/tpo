const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
// Configure the email transporter
exports.transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true, // You can use other services like 'SendGrid', 'Mailgun', etc.
  auth: {
    user: 'technologies.getfly@gmail.com', // Replace with your email
    pass: 'jrlhfsdwrefegaha'   // Replace with your email password
  }
});

// exports.module = {transporter};