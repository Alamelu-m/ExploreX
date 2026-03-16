const express = require("express");
const router = express.Router();  // make sure this is here
const User = require("../models/User");

// GET user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

