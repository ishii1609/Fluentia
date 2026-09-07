const userModel=require('../models/usermodel');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

async function registerUser(req,res){
    const{name,username,email,password}=req.body
    
const existingUser = await userModel.findOne({
  $or: [
    { email },
    { username }
  ]
})

if (existingUser) {
  return res.status(400).json({
    message: "Username or email already exists"
  })
}
const hash=await bcrypt.hash(password,10)

const user = await userModel.create({
  name,
  username,
  email,
  password: hash
});

const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "30d" }
)
res.cookie("token", token, {
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",//cross site render vercel cookiie block na ho
});

res.status(201).json({
        message:'user registered successfully',
     user:{
        id:user._id,
        name:user.name,
        username:user.username,
        email:user.email,
       
     }
    })
}
   
async function loginUser(req,res){
    const{username,email,password}=req.body;
    const user=await userModel.findOne({
        $or:[
            {username},
            {email}       
    ]
    })
   if(!user) {
    return res.status(401).json({message:'invalid credentials'})
   }

   const isPasswordValid=await bcrypt.compare(password,user.password)
   if(!isPasswordValid){
    return res.status(401).json({message:"invalid passsword"})
   }
   const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "30d" }
)

  res.cookie("token", token, {
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
});
   res.status(200).json({
    message:'user logged in successfully',
    user:{
        name:user.name,
        id:user._id,
        username:user.username,
        email:user.email,
       
    }
   })
}

async function logoutUser(req,res){
      res.clearCookie("token");

 res.status(200).json({
    message: "Logged out successfully"
  });

}

module.exports={registerUser,loginUser,logoutUser}


