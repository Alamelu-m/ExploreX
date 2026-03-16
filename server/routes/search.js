const express = require("express");
const router = express.Router();

const { searchPlace } = require("../search/search.controller");

router.post("/", searchPlace);

module.exports = router;
