const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/authMiddleware");

const {
  requestRide,
  getRideHistory,
  getPendingRides,
  updateRideStatus,
  getCurrentRide,
} = require("../controllers/rideController");

router.post("/", checkAuth, requestRide);
router.get("/", checkAuth, getRideHistory);
router.get("/pending", checkAuth, getPendingRides);
router.get("/current", checkAuth, getCurrentRide);
router.post("/update-status/:id", checkAuth, updateRideStatus);

module.exports = router;
