const transporter = require("../config/mailer");

module.exports = (array) => {
    array.forEach(email => {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Rejection",
            text: "Talent score less than 8"
        };

        transporter.sendMail(mailOptions, (error, _) => {
            if (error) {
                console.error("Error in sendEmail", error);
            }
        });
    });

}