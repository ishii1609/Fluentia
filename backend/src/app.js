 const express=require('express')
 const authroutes=require('./routes/auth.Routes')
 const cookieParser =require ('cookie-parser')
const app=express()
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authroutes)

module.exports=app