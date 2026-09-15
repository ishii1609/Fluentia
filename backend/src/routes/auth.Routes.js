
const express=require('express');
const authController=require('../controller/auth.controller')
const{ authCheck }=require('../middleware/auth.middleware')

const router=express.Router();
router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)
router.post('/logout',authController.logoutUser)
router.get('/check',authCheck,authController.checkAuth)

module.exports=router;