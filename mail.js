const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");
const smtpTransport = require("nodemailer-smtp-transport");

const transport = nodemailer.createTransport(
  smtpTransport({
    service: "hotmail",
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      }),
    },
  })
);

const sendMail = (name, email, text, cb) => {
  const mailOptions = {
    sender: name,
    from: email,
    to: "baker_mel@hotmail.com",
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
