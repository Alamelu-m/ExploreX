// const { getTrendingPlaces } = require("./recommended.service");

// const fetchRecommendedPlaces = async (req, res) => {
//   try {
//     const places = await getTrendingPlaces();

//     res.status(200).json({
//       success: true,
//       places,
//     });
//   } catch (error) {
//     console.error("Recommended Places Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch recommended places",
//     });
//   }
// };

// module.exports = { fetchRecommendedPlaces };

// const Recommended = require("../models/recommended.db");
// const { fetchFromGemini } = require("./recommended.service");
// const readCountryImages = require("../utils/readCountryImages");
// const extractCountry = require("../utils/extractCountry");

// const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

// const getRecommendedPlaces = async (req, res) => {
//   try {
//     const cached = await Recommended.findOne();

//     // ✅ Use cached data for 5 days
//     if (cached && Date.now() - cached.lastUpdated < FIVE_DAYS) {
//       return res.json({
//         success: true,
//         places: cached.places,
//         source: "cache"
//       });
//     }

//     // 🔁 After 5 days → call Gemini
//     const freshPlaces = await fetchFromGemini();

//     // 🔄 Replace old data
//     if (cached) {
//       cached.places = freshPlaces;
//       cached.lastUpdated = Date.now();
//       await cached.save();
//     } else {
//       await Recommended.create({ places: freshPlaces });
//     }

//     res.json({
//       success: true,
//       places: freshPlaces,
//       source: "gemini"
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// };

// module.exports = { getRecommendedPlaces };-----------------------------------------------------------

// const Recommended = require("../models/recommended.db");
// const { fetchFromGemini } = require("./recommended.service");
// const readCountryImages = require("../utils/readCountryImages");
// const extractCountry = require("../utils/extractCountry");

// const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

// const getRecommendedPlaces = async (req, res) => {
//   try {
//     let data = await Recommended.findOne();

//     if (!data || Date.now() - data.lastUpdated > FIVE_DAYS) {
//       const freshPlaces = await fetchFromGemini();
//       data = await Recommended.findOneAndUpdate(
//         {},
//         { places: freshPlaces, lastUpdated: Date.now() },
//         { upsert: true, new: true }
//       );
//     }

//     const countryImages = readCountryImages();

//     const enrichedPlaces = data.places.map((place) => {
//       const country = extractCountry(place.place_name);

//       const imageMatch = countryImages.find(
//         (row) =>
//           row.country &&
//           country &&
//           row.country.toLowerCase() === country.toLowerCase()
//       );

//       return {
//         ...place,
//         country,
//         image: imageMatch?.image_link || null
//       };
//     });

//     res.json({
//       success: true,
//       places: enrichedPlaces,
//       source: "cache"
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// };

// module.exports = { getRecommendedPlaces };
const Recommended = require("../models/recommended.db");
const { fetchFromGemini } = require("./recommended.service");
const { loadExcelData } = require("../utils/readCountryImages");


const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

const getRecommendedPlaces = async (req, res) => {
  try {
    const cached = await Recommended.findOne();

    if (cached && Date.now() - cached.lastUpdated < FIVE_DAYS) {
      return res.json({
        success: true,
        places: cached.places,
        source: "cache"
      });
    }

    const freshPlaces = await fetchFromGemini();

    if (cached) {
      cached.places = freshPlaces;
      cached.lastUpdated = Date.now();
      await cached.save();
    } else {
      await Recommended.create({
        places: freshPlaces,
        lastUpdated: Date.now()
      });
    }

    res.json({
      success: true,
      places: freshPlaces,
      source: "gemini"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

module.exports = { getRecommendedPlaces };
