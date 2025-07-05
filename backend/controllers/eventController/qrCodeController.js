const nodemailer = require('nodemailer');
const { transporter } = require('../../config/mailConfig');

exports.sendAttendanceQrcode = async (req, res) => {
  try {
    const { email, src, isOnline } = req.body;
   
    let mailOptions = {}

    if (isOnline) {
      mailOptions = {
        from: 'technologies.getfly@gmail.com', // Sender address
        to: email, // Receiver
        subject: 'Attendance QR Code', // Subject line
        text: 'You are registered for an online event', // Plain text body
        html: `<h4>Your registration is successful. Please scan QR code at registration desk to register your attendance</h4>
               <a href=${src}>Meeting Link</a>
               <p>[${src}]</p>
               `, // HTML body
      };
    } else {
      
      mailOptions = {
       from: 'technologies.getfly@gmail.com', // Sender address
       to: email, // Receiver
       subject: 'Attendance QR Code', // Subject line
       text: 'You are registered for the event, and this is your QR code.', // Plain text body
        html: `<p>You are registered for an online event. Here is the event link</p>
              <img src="${src}" alt="QR Code" />`, // HTML body
       attachments: [
         {
           filename: 'qr-code.png',
           content: src.split('base64,')[1],
           encoding: 'base64'
         }
       ]
     };
    }


    // Send the email
    await transporter.sendMail(mailOptions);

    // Send a successful response
    return res.status(200).json({
      message: 'Email sent successfully',
      success: true
    });
  } catch (error) {
    console.error('Error sending email:', error.message);
    return res.status(500).json({
      errors: error.message
    });
  }
};