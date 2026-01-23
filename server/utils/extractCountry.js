// const extractCountry = (placeName = "") => {
//   // "Kyoto, Japan" → "Japan"
//   const parts = placeName.split(",");
//   return parts.length > 1 ? parts[parts.length - 1].trim() : null;
// };

// module.exports = extractCountry;
const extractCountry = (placeName = "") => {
  const parts = placeName.split(",");
  return parts.length > 1 ? parts[1].trim() : null;
};

module.exports = extractCountry;
