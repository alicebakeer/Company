const express=require('express');
const { connectDB } = require("./database");
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());

const usersRouter = require("./contact");
app.use('/api', usersRouter);
app.get('/',(req,res)=>{
    res.send('Backend server is running  ');
});app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});