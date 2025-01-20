const express = require("express");
const mongoose = require("mongoose");

const taskRoutes = require("./Routes/taskRoute");
const noteRoutes = require("./Routes/noteRoute");
const userRoutes = require("./Routes/userRoute")

const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


//Mongoose Connection

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


//MiddleWares

app.use(cors());
app.use(express.json());

//Routing
app.use("/api",taskRoutes);
app.use("/api",noteRoutes);
app.use("/api",userRoutes);

//Api Testing Route
app.get("/",(req,res)=>{
    res.send("Api running");
})

//Server Listening
app.listen(PORT, (req,res)=>{
    console.log(`Server running on port ${PORT}`)
})