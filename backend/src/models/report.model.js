const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    fillerWordsCount: {
      type: Number,
      default: 0,
    },
    totalWords: {
      type: Number,
      default: 0,
    },
    fluencyScore: {
      type: Number, // 0-100
      default: 0,
    },
    grammarFeedback: {
      type: String,
      default: "",
    },
    vocabularySuggestions: {
      type: String,
      default: "",
    },
    mispronouncedWords: [
      {
        word: String,
        confidence: Number, 
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);