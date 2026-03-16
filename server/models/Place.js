// const mongoose = require("mongoose");

// const placeSchema = new mongoose.Schema({
//   name: String,
//   city: String,
//   country: String,
//   location: {
//     type: {
//       type: String,
//       enum: ["Point"],
//       required: true
//     },
//     coordinates: {
//       type: [Number], // [longitude, latitude]
//       required: true
//     }
//   },

//   fetchedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // 🔥 VERY IMPORTANT
// placeSchema.index({ location: "2dsphere" });

// module.exports = mongoose.model("Place", placeSchema);
const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: String,
  description: String,   // ✅ NEW
  image: String,         // ✅ NEW
  city: String,
  country: String,

  distanceKm: Number,    // ✅ NEW (pre-calculated)

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [lon, lat]
      required: true
    }
  },

  fetchedAt: {
    type: Date,
    default: Date.now
  }
});

placeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Place", placeSchema);
