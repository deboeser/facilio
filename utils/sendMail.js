const nodemailer = require("nodemailer");
const emailconfig = require("../config/emailconfig").config;

const sendMail = mailOptions => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport(emailconfig);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve({ success: true, messageId: info.messageId });
    });
  });
};

module.exports = sendMail;
