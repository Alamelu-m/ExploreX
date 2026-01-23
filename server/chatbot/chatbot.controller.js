const getChatbotReply = require("./chatbot.service");

const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const reply = await getChatbotReply(message);

    res.json({ success: true, reply });
  } catch (error) {
    console.error("Chatbot Controller Error:", error);
    res.status(500).json({
      success: false,
      reply: "Server error. Please try again later.",
    });
  }
};

module.exports = { chatWithBot };
