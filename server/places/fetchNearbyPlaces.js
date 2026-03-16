// const axios = require("axios");
// const generatePlaceDescription = require("./geminiDescription");
// const haversineDistance = require("../utils/distance");

// const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY;

// const fetchNearbyPlaces = async (userLat, userLon) => {
//   const url = `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${userLon},${userLat},50000&limit=6&apiKey=${GEOAPIFY_KEY}`;

//   const response = await axios.get(url);
//   const places = response.data.features;

//   const formattedPlaces = [];

//   for (const p of places) {
//     const name = p.properties.name || "Popular Place";
//     const city = p.properties.city || "";
//     const country = p.properties.country || "";

//     const lat = p.geometry.coordinates[1];
//     const lon = p.geometry.coordinates[0];

//     formattedPlaces.push({
//       name,
//       city,
//       country,

//       description: await generatePlaceDescription(name, city, country),

//       image:
//         p.properties.image ||
//         `https://source.unsplash.com/600x400/?${encodeURIComponent(name)}`,

//       distanceKm: Number(
//         haversineDistance(
//           { lat: userLat, lng: userLon },
//           { lat, lng: lon }
//         ).toFixed(2)
//       ),

//       location: {
//         type: "Point",
//         coordinates: [lon, lat]
//       },

//       lastUpdated: new Date()
//     });
//   }

//   return formattedPlaces;
// };

// module.exports = fetchNearbyPlaces;

const axios = require("axios");
const generatePlaceDescription = require("./geminiDescription");
const haversineDistance = require("../utils/distance");

const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY;

const fetchNearbyPlaces = async (userLat, userLon) => {
  const url = `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${userLon},${userLat},50000&limit=6&apiKey=${GEOAPIFY_KEY}`;

  const response = await axios.get(url);
  const places = response.data.features;

  const formattedPlaces = [];

  for (const p of places) {
    const name = p.properties.name || "Popular Place";
    const city = p.properties.city || "";
    const country = p.properties.country || "";

    const lat = p.geometry.coordinates[1];
    const lon = p.geometry.coordinates[0];

    formattedPlaces.push({
      name,
      city,
      country,

      description: await generatePlaceDescription(name, city, country),

      image:
        p.properties.image ||
        `https://source.unsplash.com/600x400/?${encodeURIComponent(name)}`,

      distanceKm: Number(
        haversineDistance(
          { lat: userLat, lng: userLon },
          { lat, lng: lon }
        ).toFixed(2)
      ),

      location: {
        type: "Point",
        coordinates: [lon, lat]
      },

      fetchedAt: new Date() // ✅ IMPORTANT
    });
  }

  return formattedPlaces;
};

module.exports = fetchNearbyPlaces;
