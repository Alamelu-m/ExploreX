const express = require("express");
const { generateTrip } = require("../services/gemini.service");

const router = express.Router();

router.post("/generate", generateTrip);

module.exports = router;
