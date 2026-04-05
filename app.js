const express =require('express')
require('dotenv').config();

const connectDB = require('./config/db');
const app=express(); 

//middleware
app.use(express.json());
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/records',require('./routes/recordRoutes'));
connectDB();

//routes
app.get('/',(req,res)=>{
    res.send("API running");
});
app.listen(5000,()=>{
    console.log("server started");
});

console.log(process.env.MONGO_URI); 
