const mongoose = require("mongoose")
const dotenv = require("dotenv")

async function connectDB(){
    return mongoose.connect(process.env.MONGODB_CONNECTION_URI)
}

module.exports = {
    connectDB
}