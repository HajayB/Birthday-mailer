const dotenv = require("dotenv");

dotenv.config();

const express = require("express");

const app = express();

const userRoutes = require("./routes/userRoutes");

const connectDB = require("./config/db"); //connect mongoDB
connectDB();

const fs = require("fs");
const path = require("path");
//connect mongoDB
connectDB();

//parse json 

app.use(express.json());
express.urlencoded({ extended: true })

//Routes 
app.use("/api/", userRoutes);

//serve html 
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

//start server 
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log("Server connected at PORT:", PORT)
})