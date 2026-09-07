const express=require ('express');
const router=express.Router();
const convoController=require('../controller/convo.controller')
router.post('./',convoController.chatWithAI)
router.get('./',convoController.getConversation)
module.exports=router;