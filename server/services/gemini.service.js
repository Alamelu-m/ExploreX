// const axios = require("axios");
// const {
//   getCoordinates,
//   getTravelTime,
//   getNearbyPlaces,
//   getCityCenter
// } = require("./geoapify.service");

// const { addMinutes, to12Hour, timeToMinutes } = require("../utils/time");

// /** Time rules */
// const DAY_START = "09:00";
// const SOFT_END = "21:00";
// const HARD_END = "23:00";

// const generateTrip = async (req, res) => {
//   try {
//     const { destination, days } = req.body;

//     // Get destination center (VERY IMPORTANT FIX)
//     const destinationCenter = await getCityCenter(destination);

//     if (!destinationCenter) {
//       return res.status(400).json({ error: "Destination not found" });
//     }

//     // Gemini prompt
//     const prompt = `
// Generate a ${days}-day travel itinerary for ${destination}.

// STRICT RULES:
// - Each day must cover ONE LOCAL AREA
// - Include 4–6 famous or popular places
// - All places must be inside ${destination}
// - DO NOT include time

// Return ONLY valid JSON:
// {
//   "days": [
//     {
//       "day": 1,
//       "area": "Local area name",
//       "schedule": [
//         {
//           "place": "Place Name",
//           "description": "Short description",
//           "durationMinutes": 90
//         }
//       ]
//     }
//   ]
// }
// `;

//     const geminiRes = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [{ parts: [{ text: prompt }] }],
//       }
//     );

//     const rawText = geminiRes.data.candidates[0].content.parts[0].text;

//     let plan;
//     try {
//       plan = JSON.parse(rawText);
//     } catch {
//       plan = { days: [] };
//     }

//     // If Gemini fails
//     if (!plan.days || plan.days.length === 0) {
//       plan.days = Array.from({ length: days }, (_, i) => ({
//         day: i + 1,
//         area: destination,
//         schedule: [],
//       }));
//     }

//     // Auto fill nearby places
//     for (const day of plan.days) {
//       day.schedule = day.schedule || [];

//       if (day.schedule.length < 4) {
//         let baseCoords = await getCoordinates(day.area, destination);

//         // Use destination center if not found
//         if (!baseCoords.coordinates) {
//           baseCoords = { coordinates: destinationCenter };
//         }

//         const extraPlaces = await getNearbyPlaces(
//           baseCoords.coordinates.lat,
//           baseCoords.coordinates.lng
//         );

//         const existingNames = new Set(day.schedule.map(p => p.place?.toLowerCase()));

//         for (const p of extraPlaces) {
//           if (!existingNames.has(p.place.toLowerCase())) {
//             day.schedule.push(p);
//             existingNames.add(p.place.toLowerCase());
//           }
//           if (day.schedule.length >= 6) break;
//         }
//       }
//     }

//     // Time chaining
//     for (const day of plan.days) {
//       let currentTime = DAY_START;
//       day.startTime = to12Hour(currentTime);
//       const validSchedule = [];

//       for (const place of day.schedule) {
//         const coords = await getCoordinates(place.place, destination);

//         if (!coords.coordinates) continue;

//         // VALIDATION: Ensure still inside destination
//         if (
//           coords.formatted &&
//           !coords.formatted.toLowerCase().includes(destination.toLowerCase())
//         ) {
//           place.coordinates = destinationCenter;
//           place.location = destination;
//         } else {
//           place.location = coords.formatted;
//           place.coordinates = coords.coordinates;
//         }

//         if (validSchedule.length > 0) {
//           place.travelTime = await getTravelTime(
//             validSchedule[validSchedule.length - 1],
//             place
//           );
//         } else {
//           place.travelTime = null;
//         }

//         const travelMin = place.travelTime ? parseInt(place.travelTime) : 0;
//         const arrivalTime = addMinutes(currentTime, travelMin);

//         if (timeToMinutes(arrivalTime) > timeToMinutes(HARD_END)) break;

//         place.time = to12Hour(arrivalTime);

//         const stayMin = place.durationMinutes || 60;
//         const endTime = addMinutes(arrivalTime, stayMin);

//         if (timeToMinutes(endTime) > timeToMinutes(HARD_END)) break;

//         place.duration = `${(stayMin / 60).toFixed(1)} hrs`;
//         currentTime = endTime;
//         delete place.durationMinutes;

//         validSchedule.push(place);

//         if (
//           timeToMinutes(currentTime) >= timeToMinutes(SOFT_END) &&
//           validSchedule.length >= 4
//         ) break;
//       }

//       day.schedule = validSchedule;
//       day.endTime = to12Hour(currentTime);
//     }

//     res.json(plan);
//   } catch (error) {
//     console.error("Trip generation error:", error);
//     res.status(500).json({ error: "Failed to generate trip" });
//   }
// };

// module.exports = { generateTrip };

const axios = require("axios");
const {
  getCoordinates,
  getTravelTime,
  getNearbyPlaces,
  getCityCenter
} = require("./geoapify.service");

const { addMinutes, to12Hour, timeToMinutes } = require("../utils/time");

const DAY_START = "09:00";
const SOFT_END = "21:00";
const HARD_END = "23:00";

const generateTrip = async (req, res) => {
  try {
    const {
      destination,
      days,
      groupSize,
      peopleCount,
      perDayBudget,
      vibe,
      skip
    } = req.body;

    const destinationCenter = await getCityCenter(destination);
    if (!destinationCenter) {
      return res.status(400).json({ error: "Destination not found" });
    }

    /* -------- Budget Category Logic -------- */

    let budgetType = "medium";

    if (perDayBudget < 800) budgetType = "low";
    else if (perDayBudget > 4000) budgetType = "luxury";

    /* -------- Gemini Prompt NOW USES USER INPUT -------- */

    const prompt = `
Create a ${days}-day itinerary for ${destination}.

User Details:
- Group Type: ${groupSize}
- People Count: ${peopleCount}
- Budget Level: ${budgetType}
- Trip Style: ${vibe}
- Avoid: ${skip}

RULES:
- Only include places inside ${destination}
- Budget friendly places if low budget
- Premium experiences if luxury
- Romantic places for couples
- Family friendly if family group
- Avoid any places related to: ${skip}

-Total day duration must be 10-12 hours.
-Include enough places to cover full day.


Return ONLY JSON:

{
  "days":[
    {
      "day":1,
      "area":"Area Name",
      "schedule":[
        {
          "place":"Place Name",
          "description":"Short description",
          "durationMinutes":90
        }
      ]
    }
  ]
}
`;

    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const rawText = geminiRes.data.candidates[0].content.parts[0].text;

    let plan;
    try {
      plan = JSON.parse(rawText);
    } catch {
      plan = { days: [] };
    }

    if (!plan.days || plan.days.length === 0) {
      plan.days = Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        area: destination,
        schedule: []
      }));
    }

    /* -------- Fill Missing Places Using Geoapify -------- */

    for (const day of plan.days) {
      day.schedule = day.schedule || [];

      if (day.schedule.length < 4) {
        let baseCoords = await getCoordinates(day.area, destination);
        // if (!baseCoords.coordinates) {
        //   baseCoords = { coordinates: destinationCenter };
        // }
        if (!baseCoords || !baseCoords.coordinates) {
          baseCoords = {
            formatted: destination,
            coordinates: destinationCenter
          };
        }

        const extraPlaces = await getNearbyPlaces(
          baseCoords.coordinates.lat,
          baseCoords.coordinates.lng
        );

        const existingNames = new Set(day.schedule.map(p => p.place?.toLowerCase()));

        for (const p of extraPlaces) {

          if (skip && p.place.toLowerCase().includes(skip.toLowerCase())) continue;

          if (!existingNames.has(p.place.toLowerCase())) {
            day.schedule.push(p);
            existingNames.add(p.place.toLowerCase());
          }
          if (day.schedule.length >= 6) break;
        }
      }
    }

    /* -------- Time + Travel -------- */

    for (const day of plan.days) {
      let currentTime = DAY_START;
      day.startTime = to12Hour(currentTime);
      const validSchedule = [];

      for (const place of day.schedule) {

        if (skip && place.place.toLowerCase().includes(skip.toLowerCase())) continue;

        let coords = await getCoordinates(place.place, destination);
        // if (!coords.coordinates) continue;
        // if (!coords || !coords.coordinates) {
        //   coords = {
        //     formatted: destination,
        //     coordinates: destinationCenter
        //   };
        // }
        if (
          coords.formatted &&
          !coords.formatted.toLowerCase().includes(destination.toLowerCase())
        ) {
          continue;
        }


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
        ) break;
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