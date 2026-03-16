const express = require("express");
const { getLogisticsNearPlan } = require("../services/logistics.service");

const router = express.Router();

router.post("/near-plan", getLogisticsNearPlan);

module.exports = router;
