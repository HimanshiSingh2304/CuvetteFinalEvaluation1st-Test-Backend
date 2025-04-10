import express from "express";
import dbconnection from "./Connection/dbconnection.js";
import dotenv from "dotenv"
import router from "./routes/index.js"
import cors from "cors"

dotenv.config();
const app= express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(express.json())
dbconnection;
app.use("/api",router)
//creating port
app.listen(process.env.PORT, ()=>{
    console.log(`Listening to port ${process.env.PORT}`);
});