const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a friendly, encouraging English speaking tutor. 
Your job is to have a natural conversation with the user to help them practice English speaking.
- Keep your replies short and conversational (2-4 sentences), like a real chat.
- If the user makes a grammar or vocabulary mistake, gently point it out and give the correct version, then continue the conversation naturally.
- Ask follow-up questions to keep the conversation going.
- Be warm and supportive, never harsh.`;

const getAIResponse = async (latestMessage, conversationHistory) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  // conversationHistory ko Gemini ke format me convert karo
  // (last message ko chhod ke, kyunki wo alag se bhejenge)
  const history = conversationHistory
    .slice(0, -1) // last message (jo abhi user ne bheja) hata do
    .map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

  const chat = model.startChat({ history });

  const result = await chat.sendMessage(latestMessage);
  const response = result.response;
  const text = response.text();

  return text;
};

module.exports = { getAIResponse };