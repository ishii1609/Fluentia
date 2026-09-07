
const mongoose=require('mongoose')
async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to db');
    
}
module.exports=connectDB