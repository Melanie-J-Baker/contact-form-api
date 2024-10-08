const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  auth: {
    user: process.env.USER,
    pass: process.env.TOKEN,
  },
});

const sendMail = (name, email, text, cb) => {
  const mailOptions = {
    from: {
      address: process.env.SENDER_EMAIL,
      name: name,
    },
    to: "baker_mel@hotmail.com",
    subject:
      "Message sent from portfolio contact form. Contact's email: " + email,
    text: text,
  };

  transport.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.error("Error sending email:", err); // Log error
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendMail;
