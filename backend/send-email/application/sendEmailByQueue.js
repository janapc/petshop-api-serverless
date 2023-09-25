const { transportNodemailer } = require("../service/email/transportNodemailer");
const Log = require("../utils/Log");

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.Records[0].body);
    const transporter = transportNodemailer();
    await transporter.sendMail({
      from: process.env.EMAIL_AUTH_USER,
      to: body.to,
      subject: body.subject,
      text: body.text,
    });
  } catch (error) {
    Log.error("sendEmailByQueue", error.message);
  }
};
