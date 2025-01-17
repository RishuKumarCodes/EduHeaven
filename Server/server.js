const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./Routes/taskRoute");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


app.use(cors());
app.use(express.json());
app.use("/api",taskRoutes);

app.get("/",(req,res)=>{
    res.send("Api running");
})



app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`)
})