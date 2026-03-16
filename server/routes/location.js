const express = require("express");
const axios = require("axios");
const User = require("../models/User");

const router = express.Router();

/**
 * POST /api/location/store
 * body: { userId, lat, lon }
 */
router.post("/store", async (req, res) => {
  const { userId, lat, lon } = req.body;

  if (!userId || lat === undefined || lon === undefined) {
    return res.status(400).json({ error: "userId, lat, lon required" });
  }

  try {
    // Reverse geocode
    const geoRes = await axios.get(
      "https://api.geoapify.com/v1/geocode/reverse",
      {
        params: {
          lat,
          lon,
          apiKey: process.env.GEOAPIFY_API_KEY,
        },
      }
    );

    const props = geoRes.data.features?.[0]?.properties;

    const locationData = {
      city: props?.city || "",
      state: props?.state || "",
      country: props?.country || "",
      lat,
      lon,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { location: locationData },
      { new: true }
    );

    res.json({ message: "Location saved", location: user.location });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Location failed" });
  }
});

module.exports = router;


