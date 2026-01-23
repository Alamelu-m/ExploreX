const mongoose = require("mongoose");

const RecommendedSchema = new mongoose.Schema({
  places: {
    type: Array,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Recommended", RecommendedSchema);
