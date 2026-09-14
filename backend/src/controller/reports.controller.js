const Conversation = require("../models/convo.model");
const Report = require("../models/report.model");
const { analyzeConversation } = require("../utils/analysisUtils");

// POST /api/report/generate/:conversationId
const generateReport = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      user: userId,
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const analysis = await analyzeConversation(conversation.messages);

    const report = await Report.create({
      user: userId,
      conversation: conversationId,
      fillerWordsCount: analysis.fillerWordsCount,
      totalWords: analysis.totalWords,
      fluencyScore: analysis.fluencyScore,
      grammarFeedback: analysis.grammarFeedback,
      vocabularySuggestions: analysis.vocabularySuggestions,
    });

    res.status(201).json(report);
  } catch (error) {
    console.error("Error generating report:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// GET /api/report/:conversationId
const getReport = async (req, res) => {
  try {
    const report = await Report.findOne({
      conversation: req.params.conversationId,
      user: req.user.id,
    });
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// GET /api/report/user/all
const getAllUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { generateReport, getReport, getAllUserReports };