const express=require('express')
const router=express.Router();
const reportController=require('../controller/reports.controller')
const {authCheck}=require('../middleware/auth.middleware')

router.post("/:conversationId", authCheck, reportController.generateReport);
router.get("/all", authCheck, reportController.getAllUserReports);
router.get("/:conversationId", authCheck, reportController.getReport);
module.exports=router;
