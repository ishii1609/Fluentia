 const express=require('express')
 const authroutes=require('./routes/auth.Routes')
 const convoroutes=require('./routes/convo.routes')
 const cookieParser =require ('cookie-parser')
const app=express()
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authroutes)
app.use('/api/convo',convoroutes)
module.exports=app