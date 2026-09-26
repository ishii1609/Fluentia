const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const ANALYSIS_PROMPT = `You are an English fluency analyzer. You will be given a transcript of a user's spoken messages in a conversation.

Analyze it and respond ONLY in this exact JSON format, nothing else, no markdown backticks:

{
  "fillerWordsCount": <number of filler words like um, uh, like, you know, actually used unnecessarily>,
  "totalWords": <total word count across all user messages>,
  "fluencyScore": <a score from 0-100 based on grammar, fluency, and sentence structure>,
  "grammarFeedback": "<2-3 sentences pointing out specific grammar mistakes and corrections, or say 'No major grammar issues' if none>",
  "vocabularySuggestions": "<1-2 sentences suggesting better word choices or phrases, or say 'Good vocabulary usage' if none>"
}

Here is the transcript (only analyze the "user" messages, ignore "ai" messages):
`;

const analyzeConversation = async (messages) => {
  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

  // sirf user ke messages nikalo
  const userMessages = messages
    .filter((msg) => msg.sender === "user")
    .map((msg) => msg.text)
    .join("\n");

  const fullPrompt = ANALYSIS_PROMPT + userMessages;

  const result = await model.generateContent(fullPrompt);
  const responseText = result.response.text();

  // Gemini kabhi kabhi ```json``` backticks laga deta hai, unhe hata do
  const cleanText = responseText.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(cleanText);
    return parsed;
   } catch (err) {
     console.error("Failed to parse Gemini analysis response:", cleanText);
     throw new Error("Analysis parsing failed");
  }
};

module.exports = { analyzeConversation };