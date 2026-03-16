// // const axios = require("axios");         new------------------------------------------------------------------------------------------------

// // const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;

// // exports.getLogisticsNearPlan = async (req, res) => {
// //   try {
// //     const { plan, totalBudget } = req.body;

// //     if (!plan || !totalBudget) {
// //       return res.status(400).json({ message: "Plan and budget required" });
// //     }

// //     const totalDays = plan.days.length;

// //     // ---- Budget Split ----
// //     const stayFoodBudget = totalBudget * 0.65;
// //     const perDayStayFood = stayFoodBudget / totalDays;
// //     const perDayHotelBudget = perDayStayFood * 0.7;
// //     const perDayFoodBudget = perDayStayFood * 0.3;

// //     // Hotel price level selection
// //     let allowedHotelPriceLevels = [1, 2];
// //     if (perDayHotelBudget > 2500) allowedHotelPriceLevels = [2, 3];
// //     if (perDayHotelBudget > 4000) allowedHotelPriceLevels = [3, 4];

// //     // Restaurant price level selection
// //     let allowedFoodPriceLevels = [1, 2];
// //     if (perDayFoodBudget > 1200) allowedFoodPriceLevels = [1, 2, 3];

// //     const resultsPerDay = [];

// //     // ---- Loop Each Day ----
// //     for (const day of plan.days) {

// //       const coords = day.places.map(p => ({
// //         lat: p.location.lat,
// //         lng: p.location.lng
// //       }));

// //       // Average center
// //       const avgLat = coords.reduce((a, c) => a + c.lat, 0) / coords.length;
// //       const avgLng = coords.reduce((a, c) => a + c.lng, 0) / coords.length;

// //       // ---- API CALLS ----
// //       const hotelsRes = await axios.get(
// //         `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${avgLng},${avgLat},3000&limit=20&apiKey=${GEOAPIFY_KEY}`
// //       );

// //       const restaurantsRes = await axios.get(
// //         `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${avgLng},${avgLat},3000&limit=20&apiKey=${GEOAPIFY_KEY}`
// //       );

// //       // ---- Filter Hotels ----
// //       const hotelMap = new Map();

// //       hotelsRes.data.features.forEach(f => {
// //         const p = f.properties;
// //         if (!p.name) return;

// //         const priceLevel = p.price_level || 2;
// //         if (!allowedHotelPriceLevels.includes(priceLevel)) return;

// //         if (!hotelMap.has(p.name)) {
// //           hotelMap.set(p.name, {
// //             name: p.name,
// //             address: p.formatted,
// //             priceLevel,
// //             approxPerNight:
// //               priceLevel === 1 ? "₹800–₹1200" :
// //               priceLevel === 2 ? "₹1500–₹2500" :
// //               priceLevel === 3 ? "₹3000–₹4500" :
// //               "₹5000+",
// //             distance: p.distance
// //           });
// //         }
// //       });

// //       const hotels = Array.from(hotelMap.values()).slice(0, 3);

// //       // ---- Filter Restaurants ----
// //       const restaurantMap = new Map();

// //       restaurantsRes.data.features.forEach(f => {
// //         const p = f.properties;
// //         if (!p.name) return;

// //         const priceLevel = p.price_level || 1;
// //         if (!allowedFoodPriceLevels.includes(priceLevel)) return;

// //         restaurantMap.set(p.name, {
// //           name: p.name,
// //           address: p.formatted,
// //           priceLevel,
// //           approxCost:
// //             priceLevel === 1 ? "₹100–₹250" :
// //             priceLevel === 2 ? "₹250–₹500" :
// //             "₹500–₹800",
// //           cuisine:
// //             p.categories?.includes("vegetarian")
// //               ? "Vegetarian"
// //               : "Veg & Non-Veg",
// //           distance: p.distance
// //         });
// //       });

// //       const restaurants = Array.from(restaurantMap.values()).slice(0, 6);

// //       // ---- Push Result ----
// //       resultsPerDay.push({
// //         day: day.day,
// //         center: { lat: avgLat, lng: avgLng },
// //         budgetSplit: {
// //           perDayStayFood: Math.round(perDayStayFood),
// //           hotelBudget: Math.round(perDayHotelBudget),
// //           foodBudget: Math.round(perDayFoodBudget)
// //         },
// //         hotels,
// //         restaurants
// //       });
// //     }

// //     res.json({
// //       totalBudget,
// //       stayFoodBudget,
// //       resultsPerDay
// //     });

// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).json({ message: "Error fetching logistics" });
// //   }
// // };-----------------------------------------------------------------------------------------------------------------------------------


const axios = require("axios");

const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY;

exports.getLogisticsNearPlan = async (req, res) => {
  try {
    const { plan, totalBudget } = req.body;

    if (!plan || !totalBudget) {
      return res.status(400).json({ message: "Plan and budget required" });
    }

    const totalDays = plan.days.length;

    // Budget Split
    const stayFoodBudget = totalBudget * 0.65;
    const perDayStayFood = stayFoodBudget / totalDays;
    const perDayHotelBudget = perDayStayFood * 0.7;
    const perDayFoodBudget = perDayStayFood * 0.3;

    let allowedHotelPriceLevels = [1, 2];
    if (perDayHotelBudget > 2500) allowedHotelPriceLevels = [2, 3];
    if (perDayHotelBudget > 4000) allowedHotelPriceLevels = [3, 4];

    let allowedFoodPriceLevels = [1, 2];
    if (perDayFoodBudget > 1200) allowedFoodPriceLevels = [1, 2, 3];

    const resultsPerDay = [];

    for (const day of plan.days) {

      // SAFETY CHECK
      if (!day.schedule || !Array.isArray(day.schedule)) {
        resultsPerDay.push({
          day: day.day,
          hotels: [],
          restaurants: []
        });
        continue;
      }

      // Extract coordinates properly
      const coords = day.schedule
        .filter(p => p.coordinates && p.coordinates.lat && p.coordinates.lng)
        .map(p => ({
          lat: p.coordinates.lat,
          lng: p.coordinates.lng
        }));

      if (coords.length === 0) {
        resultsPerDay.push({
          day: day.day,
          hotels: [],
          restaurants: []
        });
        continue;
      }

      // Average center
      const avgLat = coords.reduce((a, c) => a + c.lat, 0) / coords.length;
      const avgLng = coords.reduce((a, c) => a + c.lng, 0) / coords.length;

      // API CALLS
      const hotelsRes = await axios.get(
        `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${avgLng},${avgLat},10000&limit=20&apiKey=${GEOAPIFY_KEY}`
      );

      const restaurantsRes = await axios.get(
        `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${avgLng},${avgLat},10000&limit=20&apiKey=${GEOAPIFY_KEY}`
      );

      // Hotels Filter
      const hotelMap = new Map();

      hotelsRes.data.features.forEach(f => {
        const p = f.properties;
        if (!p.name) return;

        const priceLevel = p.price_level || 2;
        if (!allowedHotelPriceLevels.includes(priceLevel)) return;

        if (!hotelMap.has(p.name)) {
          hotelMap.set(p.name, {
            name: p.name,
            address: p.formatted,
            approxPerNight:
              priceLevel === 1 ? "₹800–₹1200" :
              priceLevel === 2 ? "₹1500–₹2500" :
              priceLevel === 3 ? "₹3000–₹4500" :
              "₹5000+",
            distance: p.distance
          });
        }
      });

      const hotels = Array.from(hotelMap.values()).slice(0, 3);

      // Restaurants Filter
      const restaurantMap = new Map();

      restaurantsRes.data.features.forEach(f => {
        const p = f.properties;
        if (!p.name) return;

        const priceLevel = p.price_level || 1;
        if (!allowedFoodPriceLevels.includes(priceLevel)) return;

        restaurantMap.set(p.name, {
          name: p.name,
          address: p.formatted,
          approxCost:
            priceLevel === 1 ? "₹100–₹250" :
            priceLevel === 2 ? "₹250–₹500" :
            "₹500–₹800",
          cuisine:
            p.categories?.includes("vegetarian")
              ? "Vegetarian"
              : "Veg & Non-Veg",
          distance: p.distance
        });
      });

      const restaurants = Array.from(restaurantMap.values()).slice(0, 6);

      resultsPerDay.push({
        day: day.day,
        center: { lat: avgLat, lng: avgLng },
        budgetSplit: {
          perDayStayFood: Math.round(perDayStayFood),
          hotelBudget: Math.round(perDayHotelBudget),
          foodBudget: Math.round(perDayFoodBudget)
        },
        hotels,
        restaurants
      });
    }

    res.json({
      totalBudget,
      stayFoodBudget,
      resultsPerDay
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching logistics" });
  }
};


