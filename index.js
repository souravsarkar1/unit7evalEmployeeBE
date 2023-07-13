const express = require('express');
const { connection } = require('./db');
// const { userRouter } = require('./routers/user.router');
var cookieParser = require('cookie-parser');
const { userRouter } = require('./routes/user.router');
const { employRouter } = require('./routes/addEmploy.roures');
var cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())

 app.use("/users",userRouter)

 app.use("/employees",employRouter)

app.get("/",(req,res)=>{
    res.send("ok")
})

app.listen(7070,async()=>{

    try {
        await connection
        console.log("connected to db")
        
    } catch (error) {
        console.log(error)
    }

    console.log(`server is runing at 7070`);
})
