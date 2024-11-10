const USER = require("../models/user")
const bcryptjs = require("bcryptjs")
const crypto = require("crypto")
const { sendVerificationEmail, sendPasswordResetEmail } = require("../mailtrap/configEmail")
const { generateUserToken } = require("../utils/generateUserToken")

async function register(req, res) {
    const { name, email, password } = req.body

    try {
        if (!name) {
            throw new Error("Enter The Name")
        }
        if (!email) {
            throw new Error("Enter The email")
        }
        if (!password) {
            throw new Error("Enter The password")
        }

        const hashPassword = await bcryptjs.hash(password, 10)
        const VerificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new USER({
            name,
            email,
            password: hashPassword,
            verificationToken: VerificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        sendVerificationEmail(email, VerificationToken)

        await user.save()

        return res.status(200).json({
            success: true, user: {
                ...user._doc,
                password: undefined
            }, message: "User registed successfully"
        })
    } catch (err) {
        console.log("err while registeration", err);
        return res.status(400).json({ success: false, message: err.message })
    }
}


async function login(req, res) {
    const { email, password } = req.body

    try {
        if (!email) {
            throw new Error("Enter The email")
        }
        if (!password) {
            throw new Error("Enter The password")
        }

        const user = await USER.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const hashPassword = await bcryptjs.compare(password, user.password)

        if (!hashPassword) {
            return res.status(400).json({ success: false, message: "Password is wrong" })
        }

        const token = generateUserToken(user._id)

        return res.status(200).json({
            success: true, token: token, user: {
                ...user._doc,
                password: undefined
            }, message: "User logined successfully"
        })

    } catch (err) {
        console.log("err while login", err);
        return res.status(400).json({ success: false, message: err.message })
    }
}



async function verifyUser(req, res) {
    const { verificationToken } = req.body

    try {
        if (!verificationToken) {
            throw new Error("Enter The verificationToken")
        }


        const user = await USER.findOne({ verificationToken })

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()

        return res.status(200).json({
            success: true, user: {
                ...user._doc,
                password: undefined
            }, message: "User is verifyied"
        })

    } catch (err) {
        console.log("err while login", err);
        return res.status(400).json({ success: false, message: err.message })
    }
}

async function forgetPassword(req, res) {
    const { email } = req.body

    try {
        if (!email) {
            throw new Error("Enter The email")
        }


        const user = await USER.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const resetPasswordToken = crypto.randomBytes(20).toString("hex")

        user.resetPasswordToken = resetPasswordToken
        user.resetPasswordExpiresAt = Date.now() + 24 * 60 * 60 * 1000

        sendPasswordResetEmail(user.email, resetPasswordToken)

        await user.save()

        return res.status(200).json({
            success: true, user: {
                ...user._doc,
                password: undefined
            }, message: "reset email is send"
        })

    } catch (err) {
        console.log("err while login", err);
        return res.status(400).json({ success: false, message: err.message })
    }
}

async function resetPassword(req, res) {
    const {email,password } = req.body

    try {
        if (!email) {
            throw new Error("Enter The email")
        }

        if (!password) {
            throw new Error("Enter The password")
        }

        const user = await USER.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const hashPassword = await bcryptjs.hash(password, 10)
        user.password = hashPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined

        await user.save()

        return res.status(200).json({
            success: true, user: {
                ...user._doc,
                password: undefined
            }, message: "passowrd is reset successfully"
        })

    } catch (err) {
        console.log("err while login", err);
        return res.status(400).json({ success: false, message: err.message })
    }
}

module.exports = {
    register,
    login,
    verifyUser,
    forgetPassword,
    resetPassword
}