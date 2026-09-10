const express=require ('express');
const router=express.Router();
const convoController=require('../controller/convo.controller')
const{ authCheck }=require('../middleware/auth.middleware')
router.post('/',authCheck,convoController.chatWithAI)
router.get('/',authCheck,convoController.getConversation)
module.exports=router;