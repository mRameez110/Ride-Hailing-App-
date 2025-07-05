const express = require("express");
const {
  requestRide,
  getRideHistory,
} = require("../controllers/rideController");

const router = express.Router();

router.post("/", requestRide);
router.get("/", getRideHistory);

module.exports = router;
