 const express=require('express')
 const authroutes=require('./routes/auth.Routes')
 const convoroutes=require('./routes/convo.routes')
 const reportroutes=require('./routes/reports.routes')
 const cookieParser =require ('cookie-parser')
 const cors=require('cors')
const app=express()
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use('/api/auth',authroutes)
app.use('/api/convo',convoroutes)
app.use('/api/report',reportroutes)
module.exports=app