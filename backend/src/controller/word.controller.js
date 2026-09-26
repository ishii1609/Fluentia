const axios = require("axios");

const WORD_LIST = [
  "eloquent", "ambiguous", "resilient", "candid", "meticulous",
  "versatile", "concise", "tenacious", "articulate", "genuine",
  "profound", "diligent", "sincere", "adaptable", "confident",
  "curious", "empathetic", "optimistic", "persistent", "humble",
];

const getWordOfTheDay = async (req, res) => {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const word = WORD_LIST[dayOfYear % WORD_LIST.length];

  try {
    const response = await axios.get(
      `https://api.datamuse.com/words?sp=${word}&md=d&max=1`,
      { timeout: 5000 }
    );

    const entry = response.data[0];
    const rawDefinition = entry?.defs?.[0]; // format: "n\tdefinition text"
    const definition = rawDefinition ? rawDefinition.split("\t")[1] : "Definition not found.";

    res.status(200).json({
      word,
      definition,
      example: `Try using "${word}" in a sentence today!`,
    });
  } catch (error) {
    console.error("Word of the day error:", error.message);
    res.status(200).json({
      word: "practice",
      definition: "The action of repeating an activity to improve a skill.",
      example: "Daily practice will help you speak more fluently.",
    });
  }
};

module.exports = { getWordOfTheDay };