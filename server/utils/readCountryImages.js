const xlsx = require("xlsx");
const path = require("path");

let cachedData = null;

const loadExcelData = () => {
  if (cachedData) return cachedData;

  const filePath = path.join(
    __dirname,
    "../data/trip_planner_50_countries_with_image_links.xlsx"
  );

  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  cachedData = xlsx.utils.sheet_to_json(sheet);
  return cachedData;
};

module.exports = { loadExcelData };
