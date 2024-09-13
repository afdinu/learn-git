//  here new thing is dotenv and routes

const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config() // config .env file

const connectDB = require("./config/db")
connectDB()
const app = express()
const port = process.env.PORT
app.use(express.json());
app.use(cors())
app.use("/api/user",require("./routes/userroutes"))


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
