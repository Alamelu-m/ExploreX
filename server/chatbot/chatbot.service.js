const axios = require("axios");

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`;

const getChatbotReply = async (message) => {
  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
You are Atlas, a friendly AI travel assistant.
Help users plan trips, suggest destinations, and answer travel questions in simple and human generated terms.

User: ${message}
Atlas:
                `,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    return reply || "🤖 I'm not sure how to respond to that.";
  } catch (error) {
    console.error(
      "Gemini REST API Error:",
      error.response?.data || error.message
    );
    return "⚠️ Atlas is having trouble right now. Please try again.";
  }
};

module.exports = getChatbotReply;
