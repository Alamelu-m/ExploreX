const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Place = require("../models/Place");

const fetchNearbyPlaces = require("../places/fetchNearbyPlaces");
const { isDataExpired } = require("../utils/utils");

router.get("/nearby/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user?.location?.lat || !user?.location?.lon) {
      return res.status(400).json({ message: "User location not found" });
    }

    const { lat, lon } = user.location;

    // 1️⃣ Check DB first
    let places = await Place.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lon, lat]
          },
          $maxDistance: 50000
        }
      }
    }).limit(6);

    // 2️⃣ Decide refresh
    const shouldRefresh =
      places.length < 6 || isDataExpired(places[0]?.fetchedAt);

    // 3️⃣ Refresh if needed
    if (shouldRefresh) {
      await Place.deleteMany({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lon, lat]
            },
            $maxDistance: 50000
          }
        }
      });

      const freshPlaces = await fetchNearbyPlaces(lat, lon);
      await Place.insertMany(freshPlaces);

      return res.json(freshPlaces);
    }

    // 4️⃣ Serve cached data
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
