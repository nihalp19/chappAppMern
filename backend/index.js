const exp = require("constants")
const express = require("express")
const dotenv = require("dotenv").config()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
const userRouter = require("./routes/user")
const {connectDB} = require("./connection/connection")
const PORT = process.env.PORT || 4000
const app = express()
app.use(cors())

app.use(express.json())

const server = http.createServer(app)

connectDB().then(() => console.log("MONGODB CONNECTED")).catch((err) => console.log("err connection :",err.message))

const io = new Server(server,{
    cors : {
        origin : "http://localhost:5173",
        methods : ["POST","GET"]
    }
})


app.use('/user',userRouter)

io.on("connection",(socket) => {
    console.log(`USER CONNECTED : ${socket.id}`);
})

server.listen(PORT,() => console.log(`SERVER STARTED ON THE PORT NO ${PORT}`))
