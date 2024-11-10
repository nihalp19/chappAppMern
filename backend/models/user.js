const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    lastlogin : {
        type : Date,
        default : Date.now()
    },
    verificationToken : String,
    verificationTokenExpiresAt : Date,
    resetPasswordToken : String,
    resetPasswordExpiresAt: Date,
    
},{timestamps : true})

const USER = mongoose.model('User',UserSchema)

module.exports = USER