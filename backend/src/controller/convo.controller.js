const Conversation = require("../models/Conversation");
const { getAIResponse } = require("../utils/aiService");

// POST /api/conversation/chat
// body: { conversationId (optional), message: "user's text" }
const chatWithAI = async (req, res) => {
  try {
    const { conversationId, message } = req.body;
    const userId = req.user.id; // authMiddleware se milega

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let conversation;

    if (conversationId) {
      conversation = await Conversation.findOne({ //findone apka pura document return krega db s
        _id: conversationId,
        user: userId,
      });
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
    } else { // yahan prr conv ek object hai aur Conv apka model ha so jo ki ek blueprint ha mtlb ye ek naya document craete krrh 
      conversation = new Conversation({ user: userId, messages: [] });
    }

   
    conversation.messages.push({ sender: "user", text: message });

    const aiReplyText = await getAIResponse(message, conversation.messages);


    conversation.messages.push({ sender: "ai", text: aiReplyText });

    await conversation.save();

    res.status(200).json({
      conversationId: conversation._id,
      reply: aiReplyText,
    });
  } catch (error) {
    console.error("Error in chatWithAI:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// GET /api/conversation/:id
const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { chatWithAI, getConversation };