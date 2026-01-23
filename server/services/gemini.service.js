

const axios = require("axios");
const {
  getCoordinates,
  getTravelTime,
  getNearbyPlaces,
} = require("./geoapify.service");

const { addMinutes, to12Hour, timeToMinutes } = require("../utils/time");

/** ⏰ Time rules */
const DAY_START = "09:00";
const SOFT_END = "21:00"; // 9 PM
const HARD_END = "23:00"; // 11 PM

/** Fallback city coordinates if unknown */
const CITY_CENTER = {
  default: { lat: 48.8566, lng: 2.3522 }, // Paris default
};

const generateTrip = async (req, res) => {
  try {
    const { destination, days } = req.body;

    // 1️⃣ First try Gemini to get structured plan
    const prompt = `
Generate a ${days}-day travel itinerary for ${destination}.

STRICT RULES:
- Each day must cover ONE LOCAL AREA
- Include 4–6 famous or popular places
- Include parks, streets, malls, museums, temples
- All places must be inside ${destination}
- DO NOT include time

Return ONLY valid JSON:
{
  "days": [
    {
      "day": 1,
      "area": "Local area name",
      "schedule": [
        {
          "place": "Place Name",
          "description": "Short description",
          "durationMinutes": 90
        }
      ]
    }
  ]
}
`;

    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const rawText = geminiRes.data.candidates[0].content.parts[0].text;

    let plan;
    try {
      plan = JSON.parse(rawText);
    } catch {
      plan = { days: [] };
    }

    // 2️⃣ If Gemini fails or schedule is empty, auto-create day placeholders
    if (!plan.days || plan.days.length === 0) {
      plan.days = Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        area: destination,
        schedule: [],
      }));
    }

    // 3️⃣ Auto-fill each day with nearby famous places
    for (const day of plan.days) {
       day.schedule = day.schedule || []; // make sure it exists

  if (day.schedule.length < 4) {
    let baseCoords = await getCoordinates(day.area, destination);

    // fallback if coordinates not found
    if (!baseCoords.coordinates) {
      baseCoords = { coordinates: { lat: 48.8566, lng: 2.3522 } }; // Paris center fallback
    }

    const extraPlaces = await getNearbyPlaces(
      baseCoords.coordinates.lat,
      baseCoords.coordinates.lng
    );

    const existingNames = new Set(day.schedule.map(p => p.place?.toLowerCase()));

    for (const p of extraPlaces) {
      if (!existingNames.has(p.place.toLowerCase())) {
        day.schedule.push(p);
        existingNames.add(p.place.toLowerCase());
      }
      if (day.schedule.length >= 6) break; // limit to 6 places per day
    }
  }
}

    // 4️⃣ Time chaining & travel
    for (const day of plan.days) {
      let currentTime = DAY_START;
      day.startTime = to12Hour(currentTime);
      const validSchedule = [];

      for (const place of day.schedule) {
        const coords = await getCoordinates(place.place, destination);
        if (!coords.coordinates) continue;

        place.location = coords.formatted;
        place.coordinates = coords.coordinates;

        if (validSchedule.length > 0) {
          place.travelTime = await getTravelTime(
            validSchedule[validSchedule.length - 1],
            place
          );
        } else {
          place.travelTime = null;
        }

        const travelMin = place.travelTime ? parseInt(place.travelTime) : 0;
        const arrivalTime = addMinutes(currentTime, travelMin);

        if (timeToMinutes(arrivalTime) > timeToMinutes(HARD_END)) break;

        place.time = to12Hour(arrivalTime);

        const stayMin = place.durationMinutes || 60;
        const endTime = addMinutes(arrivalTime, stayMin);

        if (timeToMinutes(endTime) > timeToMinutes(HARD_END)) break;

        place.duration = `${(stayMin / 60).toFixed(1)} hrs`;
        currentTime = endTime;
        delete place.durationMinutes;

        validSchedule.push(place);

        if (
          timeToMinutes(currentTime) >= timeToMinutes(SOFT_END) &&
          validSchedule.length >= 4
        )
          break;
      }

      day.schedule = validSchedule;
      day.endTime = to12Hour(currentTime);
    }

    res.json(plan);
  } catch (error) {
    console.error("Trip generation error:", error);
    res.status(500).json({ error: "Failed to generate trip" });
  }
};

module.exports = { generateTrip };

