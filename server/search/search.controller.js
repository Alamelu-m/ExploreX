const fetchPlaceFromGemini = require("./gemini.services");

const searchPlace = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const result = await fetchPlaceFromGemini(query);

    if (result.error) {
      return res.status(500).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Search controller error:", error.message);
    res.status(500).json({ error: "Failed to fetch place details" });
  }
};

module.exports = { searchPlace };

