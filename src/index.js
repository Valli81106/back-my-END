import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

app.use((err,req,res,next)=>{
        console.error("Express error caught: ", err.stack);
        res.status(500).json({message: "Something broke!"});
    })

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Port is runnign on: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Monog db connection failed")
})


/*
import express from "express";
const app = express();

;(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=> {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is runnin on ${process.env.PORT}`)
        })
    }catch (error){
        console.log(error.message)
        throw err
    }
})()
*/