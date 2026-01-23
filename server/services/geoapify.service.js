const axios = require("axios");
const haversineDistance= require("../utils/distance");

const getCoordinates = async (place, city) => {
  try {
    const url = "https://api.geoapify.com/v1/geocode/search";

    const res = await axios.get(url, {
      params: {
        text: `${place}, ${city}`,
        limit: 1,
        apiKey: process.env.GEOAPIFY_API_KEY,
      },
    });

    // ❗ If no location found
    if (
      !res.data ||
      !res.data.features ||
      res.data.features.length === 0
    ) {
      return {
        formatted: `${place}, ${city}`,
        coordinates: null,
      };
    }

    const feature = res.data.features[0];
    const [lon, lat] = feature.geometry.coordinates;

    return {
      formatted: feature.properties.formatted,
      coordinates: {
        lat,
        lng: lon,
      },
    };
  } catch (error) {
    console.error("Geoapify geocode error:", error.message);

    return {
      formatted: `${place}, ${city}`,
      coordinates: null,
    };
  }
};


const normalizeCoords = (place) => {
  if (!place) return null;

  // Accept BOTH formats
  if (place.lat && place.lng) return place;
  if (place.coordinates) return place.coordinates;

  return null;
};

const getTravelTime = async (from, to) => {
  const start = normalizeCoords(from);
  const end = normalizeCoords(to);

  if (!start || !end) return null;

  const km = haversineDistance(start, end);
  const walkingSpeed = 4.8;
  const fallbackTime = `${Math.round((km / walkingSpeed) * 60)} min`;

  try {
    const res = await axios.get(
      "https://api.geoapify.com/v1/routing",
      {
        params: {
          waypoints: `${start.lat},${start.lng}|${end.lat},${end.lng}`,
          mode: "drive",
          apiKey: process.env.GEOAPIFY_API_KEY,
        },
      }
    );

    const seconds = res.data?.features?.[0]?.properties?.time;
    if (seconds) {
      return `${Math.round(seconds / 60)} min`;
    }

    return fallbackTime;
  } catch {
    return fallbackTime;
  }
};

const getNearbyPlaces = async (lat, lng) => {
  const res = await axios.get(
    "https://api.geoapify.com/v2/places",
    {
      params: {
        categories:
          "tourism,entertainment,leisure,commercial,heritage,religion",
        filter: `circle:${lng},${lat},9000`, // 3km radius
        limit: 8,
        apiKey: process.env.GEOAPIFY_API_KEY,
      },
    }
  );

  return res.data.features.map((f) => ({
    place: f.properties.name,
    description:
      f.properties.categories?.[0]?.replace(".", " ") ||
      "Popular local place",
    durationMinutes: 60,
  }));
};

module.exports = {
  getCoordinates,
  getTravelTime,
  getNearbyPlaces, // 👈 ADD
};







