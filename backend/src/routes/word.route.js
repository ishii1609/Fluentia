const express = require("express");
const router = express.Router();
const { getWordOfTheDay } = require("../controller/word.controller");

router.get("/", getWordOfTheDay);

module.exports = router;