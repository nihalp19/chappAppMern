const transporter = require("./email")
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./Emailtemplate")


async function sendVerificationEmail(email, verificationToken) {

    try {
        const response = await transporter.sendMail({
            from: "mailtrap@demomailtrap.com",
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        })

        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
}

async function sendPasswordResetEmail(email, resetPasswordToken) {

    try {
        const response = await transporter.sendMail({
            from: "mailtrap@demomailtrap.com",
            to: email,
            subject: "Reset Your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetPasswordToken)
        })

        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending reset password`, error);

        throw new Error(`Error sending reset password email: ${error}`);
    }
}
module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
}