// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// /**
//  * Generate a short travel description for a place
//  * @param {string} placeName
//  * @param {string} city
//  * @param {string} country
//  * @returns {Promise<string>}
//  */
// const generatePlaceDescription = async (placeName, city, country) => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "models/gemini-3-flash-preview",
//     });

//     const prompt = `
// Write a short, attractive 1–2 line travel description.

// Rules:
// - Friendly and inviting
// - No emojis
// - Max 30 words
// - Do NOT mention "tourists" or "travelers"

// Place: ${placeName}
// City: ${city || "Unknown"}
// Country: ${country || "Unknown"}
// `;

//     const result = await model.generateContent(prompt);

//     return result.response.text().trim();
//   } catch (error) {
//     console.error("Gemini description error:", error.message);

//     // 🔁 Safe fallback (NO crash)
//     return `${placeName} is a popular place in ${city || "this city"}, known for its unique atmosphere and local charm.`;
//   }
// };

// module.exports = generatePlaceDescription;

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePlaceDescription = async (placeName, city, country) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-3-flash-preview"
    });

    const prompt = `
Write a short, attractive 1–2 line travel description.

Rules:
- Friendly and inviting
- Max 30 words
- No emojis
- Do NOT mention tourists

Place: ${placeName}
City: ${city || "Unknown"}
Country: ${country || "Unknown"}
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error("Gemini error:", err.message);

    // ✅ SAFE FALLBACK (no crash, no retry spam)
    return `${placeName} is a well-known place in ${city || "this city"}, offering a unique atmosphere and local charm.`;
  }
};

module.exports = generatePlaceDescription;
