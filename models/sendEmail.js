const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        var transporter = nodemailer.createTransport({
            service: "your",
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
              user: "krishmarish777@gmail.com",
              pass: "xqknidekffmmizfn"
            }
          });

        await transporter.sendMail({
            from: "krishmarish777@gmail.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;