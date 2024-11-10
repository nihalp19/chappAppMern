const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()

function generateUserToken(userId){
    try{
        if(!userId){
            throw new Error("userid is not found in generateUserToken")
        }

        return jwt.sign({userId},process.env.JWT_SECRET_KEY)
    }catch(err){
        console.log("err while generateUserToken",err.message);
    }
}

module.exports = {
    generateUserToken
}