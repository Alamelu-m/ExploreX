// const axios = require("axios");

// const GEMINI_URL =
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

// /* 🔧 Extract JSON safely */
// function extractJSON(text) {
//   const start = text.indexOf("{");
//   const end = text.lastIndexOf("}");
//   if (start === -1 || end === -1) {
//     throw new Error("No JSON found");
//   }
//   return text.substring(start, end + 1);
// }

// const fetchFromGemini = async (query) => {
//   const prompt = `
// You are a SMART travel and tourism API.

// User question: ${query}

// Your task:
// 1. First, give a SHORT summary answering the question.
// 2. Identify the category automatically.
// 3. Then list 2 to 3 relevant places.

// STRICT RULES:
// - Return ONLY valid JSON
// - No markdown
// - No explanations outside JSON

// Schema:
// {
//   "summary": "",
//   "category": "",
//   "places": [
//     {
//       "name": "",
//       "type": "",
//       "description": "",
//       "location": "",
//       "estimatedBudget": "",
//       "currentUpdate": ""
//     }
//   ]
// }
// `;

//   try {
//     const response = await axios.post(
//       `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [{ role: "user", parts: [{ text: prompt }] }],
//         generationConfig: {
//           temperature: 0.4,
//           maxOutputTokens: 1600
//         }
//       }
//     );

//     const rawText =
//       response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!rawText) throw new Error("Empty Gemini response");

//     console.log("🟡 Raw Gemini output:", rawText);

//     const jsonText = extractJSON(rawText);
//     const parsed = JSON.parse(jsonText);

//     if (!parsed.places || parsed.places.length === 0) {
//       throw new Error("No places returned");
//     }

//     return parsed;
//   } catch (error) {
//     console.error("❌ Gemini error:", error.message);
//     return {
//       summary: "Unable to fetch information at the moment.",
//       category: "unknown",
//       places: []
//     };
//   }
// };

// module.exports = fetchFromGemini;

const axios = require("axios");

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

/* 🔧 Extract JSON safely */
function extractJSON(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON found");
  }
  return text.substring(start, end + 1);
}

const fetchFromGemini = async (query) => {
  const prompt = `
You are a SMART travel guide API.

User request: Provide detailed information about the place "${query}".

Your task:
1. Give a SHORT summary about the place.
2. Describe the CLIMATE of the place.
3. List FAMOUS AREAS or neighborhoods.
4. List FAMOUS LOCAL FOODS.

STRICT RULES:
- Return ONLY valid JSON
- No markdown
- No explanations outside JSON

Schema:
{
  "summary": "",
  "climate": "",
  "famousAreas": [],
  "famousFoods": []
}
`;

  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1200
        }
      }
    );

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) throw new Error("Empty Gemini response");

    console.log("🟡 Raw Gemini output:", rawText);

    const jsonText = extractJSON(rawText);
    const parsed = JSON.parse(jsonText);

    return parsed;
  } catch (error) {
    console.error("❌ Gemini error:", error.message);
    return {
      summary: "Unable to fetch information at the moment.",
      climate: "unknown",
      famousAreas: [],
      famousFoods: []
    };
  }
};

module.exports = fetchFromGemini;
