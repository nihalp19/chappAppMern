const express = require("express")
const { register,login ,verifyUser,forgetPassword,resetPassword} = require("../controllers/user")
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/verify-user', verifyUser)
router.post('/forget-password', forgetPassword)
router.post('/reset-Password/:id', resetPassword)


module.exports = router
