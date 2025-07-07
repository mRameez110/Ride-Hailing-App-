const {
  requestRideService,
  getRideHistoryService,
  getPendingRidesService,
  updateRideStatusService,
  getCurrentRideService,
} = require("../services/rideService");

exports.requestRide = async (req, res, next) => {
  try {
    const ride = await requestRideService(req.body, req.user._id);
    res.status(201).json({
      message: "Ride requested successfully",
      ride,
    });
  } catch (err) {
    next(err);
  }
};

exports.getRideHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userType = req.user.type;
    const rides = await getRideHistoryService(userId, userType);
    res.status(200).json({
      message: "Ride history fetched",
      rides,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPendingRides = async (req, res, next) => {
  try {
    const rides = await getPendingRidesService();
    res.status(200).json({
      message: "Pending Rides",
      rides,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateRideStatus = async (req, res, next) => {
  try {
    const rideId = req.params.id;
    const { status } = req.body;
    const updatedRide = await updateRideStatusService(rideId, status);
    res.status(200).json({
      message: `Ride ${status.toLowerCase()} successfully`,
      ride: updatedRide,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCurrentRide = async (req, res, next) => {
  try {
    console.log("Current ride API hit", req.user);
    
    const ride = await getCurrentRideService(req.user._id, req.user.type);

    console.log("Current Ride Service Response:", ride);

    if (!ride) {
      return res.status(404).json({ message: "No active ride found" });
    }

    console.log("Current Ride:", ride);

    res.status(200).json({
      message: "Active Rides fetched successfully",
      ride,
    });
  } catch (err) {
    next(err);
  }
};
