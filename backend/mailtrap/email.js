const nodemailer = require("nodemailer")
// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0250362ab1faea",
    pass: "03e5ef6445f2aa"
  }
});

module.exports = transport
