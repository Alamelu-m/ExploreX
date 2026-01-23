const { loadExcelData } = require("../utils/readCountryImages");
const extractCountry = require("../utils/extractCountry");

const fetchFromGemini = async () => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const prompt = `
  Give 6 trending travel destinations around the world.
  Each destination must include:
  - place_name
  - description (1 line)
  - duration_days (number only)
  - image_keyword

  Return ONLY valid JSON array.
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No response from Gemini API");
  }

  const places = JSON.parse(text);

  // ✅ Load Excel
  const excelImages = loadExcelData();

  
//   const finalPlaces = places.map((place) => {
//   const country = extractCountry(place.place_name);

//   console.log("Place name:", place.place_name);
//   console.log("Extracted country:", country);
//   console.log("Excel first row:", excelImages[0]);

//   const match = excelImages.find(
//     row =>
//       row.country?.toLowerCase() === country?.toLowerCase()
//   );

//   console.log("Matched row:", match);

//   return {
//     ...place,
//     image_url: match?.image_url || "/fallback.jpg",
//   };
// });

  const finalPlaces = places.map((place) => {
  const country = extractCountry(place.place_name);

  const match = excelImages.find(
    row =>
      row["Country Name"]?.trim().toLowerCase() ===
      country?.trim().toLowerCase()
  );

  return {
    ...place,
    image_url: match?.["Image Link"] || "/fallback.jpg",
  };
});


  return finalPlaces;
};

module.exports = { fetchFromGemini };
