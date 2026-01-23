const express = require("express");


const {  getRecommendedPlaces } = require("./recommended.controller");

const router = express.Router();

router.get("/",  getRecommendedPlaces);

module.exports = router;
