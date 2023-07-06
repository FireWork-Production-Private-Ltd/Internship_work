const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: '',
           pass: ''
       }
   });

const SendMail = async(email,html) => {
    const mailOptions = {
        from: '', // sender address
        to: email, // list of receivers
        subject: 'OTP From Waste Management', // Subject line
        html: html// plain text body
      };
     const sendmail = await transporter.sendMail(mailOptions);
}
module.exports = {
    SendMail
}