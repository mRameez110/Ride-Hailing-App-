const express = require("express");
const {
  requestRide,
  getRideHistory,
} = require("../controllers/rideController");
const checkAuth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", checkAuth, requestRide);
router.get("/", checkAuth, getRideHistory);
router.get("/:id", checkAuth, getSingleRide);
router.patch("/:id/status", checkAuth, updateRideStatus);

module.exports = router;
