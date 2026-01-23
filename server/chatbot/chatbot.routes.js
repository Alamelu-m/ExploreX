const express = require("express");
const { chatWithBot } = require("./chatbot.controller");

const router = express.Router();

// POST /api/chat
router.post("/", chatWithBot);

module.exports = router;
