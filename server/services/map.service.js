const { getCoordinates } = require("./geoapify.service");

const getMapData = async (req, res) => {
  try {
    const { plan, logistics, destination } = req.body;

    if (!plan || !plan.days) {
      return res.status(400).json({ error: "Plan required" });
    }

    const markers = [];
    const unique = new Set();
    

    /* ---------------- PLACES MARKERS ---------------- */

    for (const day of plan.days) {
      for (const place of day.schedule || []) {

        if (!place.place) continue;

        const key = place.place.toLowerCase();
        if (unique.has(key)) continue;
        unique.add(key);

        let coords = place.coordinates;

        // If Gemini didn't give coordinates → fetch
        if (!coords) {
          const geo = await getCoordinates(place.place, destination);
          coords = geo.coordinates;
        }

        if (!coords) continue;

        markers.push({
          type: "place",
          name: place.place,
          lat: coords.lat,
          lng: coords.lng,
          day: day.day,
          time: place.time || ""
        });
      }
    }

    /* ---------------- HOTELS + RESTAURANTS ---------------- */

    if (logistics && logistics.resultsPerDay) {

      for (const dayData of logistics.resultsPerDay) {

        // Hotels
        for (const hotel of dayData.hotels || []) {

            const key = hotel.name.toLowerCase();
            if (unique.has(key)) continue;
            unique.add(key);

          const geo = await getCoordinates(hotel.name, destination);

          if (!geo.coordinates) continue;

          markers.push({
            type: "hotel",
            name: hotel.name,
            lat: geo.coordinates.lat,
            lng: geo.coordinates.lng,
            day: dayData.day
          });
        }

        // Restaurants
        for (const resItem of dayData.restaurants || []) {

          const key = resItem.name.toLowerCase();
          if (unique.has(key)) continue;
          unique.add(key);

          const geo = await getCoordinates(resItem.name, destination);

          if (!geo.coordinates) continue;

          markers.push({
            type: "restaurant",
            name: resItem.name,
            lat: geo.coordinates.lat,
            lng: geo.coordinates.lng,
            day: dayData.day
          });
        }
      }
    }

    res.json({
      success: true,
      totalMarkers: markers.length,
      markers
    });

  } catch (error) {
    console.error("Map data error:", error);
    res.status(500).json({ error: "Map data failed" });
  }
};

module.exports = { getMapData };
