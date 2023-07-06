const express = require('express')
const nodemailer = require('nodemailer');
async function main() {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'jalyn.bergstrom54@ethereal.email',
                pass: 'h4WanU54WH7NgkFzbf'
            }
        });

        //here i have used ethreal fake smtp service to check weather it is working or not
        let info = await transporter.sendMail({
            from: '"Shamon Hashmi 👻" <jalyn.bergstrom54@ethereal.email>',
            to: "shamon@widski.com", // list of receivers
            subject: "Report Generated ✔",
            text: "Report has been Generated",
            html: "<b>Reported has been generated for this product</b>",
        });
        console.log("Message sent: %s", info.messageId);


        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    main
}