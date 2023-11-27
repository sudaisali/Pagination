const express = require('express')
const mongoose = require('mongoose')
const app = express()
const carsRouter = require('./routes/cars')

app.use(express.json())

app.use('/cars',carsRouter)

mongoose.connect("mongodb://localhost:27017/CMS").then(
    ()=>{
        console.log("Database is connected")
        app.listen(3000,()=>{
            console.log("Server is started")
        })
    }
)


