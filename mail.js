const nodemailer = require("nodemailer");

const TOKEN = process.env.TOKEN;

const transport = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  auth: {
    user: process.env.USER,
    pass: process.env.TOKEN,
  },
});

const sender = {
  address: process.env.SENDER_EMAIL,
  name: "Contact form",
};

const recipients = ["baker_mel@hotmail.com"];

const sendMail = (name, email, text, cb) => {
  const mailOptions = {
    sender: name,
    from: sender,
    to: recipients,
    email: email,
    subject: "Message sent from portfolio contact form!!",
    text: text,
  };
  transport.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendMail;
