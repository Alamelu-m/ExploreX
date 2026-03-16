const express = require("express");
const { getMapData } = require("../services/map.service");

const router = express.Router();

router.post("/markers", getMapData);

module.exports = router;
