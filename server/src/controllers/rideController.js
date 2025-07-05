const {
  requestRideService,
  getRideHistoryService,
  getSingleRideService,
} = require("../services/rideService");

const requestRide = async (req, res, next) => {
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

const getRideHistory = async (req, res, next) => {
  try {
    const rides = await getRideHistoryService(req.user._id);
    res.status(200).json({
      message: "Ride history fetched",
      rides,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleRide = async (req, res, next) => {
  try {
    const ride = await getSingleRideService(req.params.id);
    res.status(200).json({ ride });
  } catch (err) {
    next(err);
  }
};

const updateRideStatus = async (req, res, next) => {
  try {
    const ride = await updateRideStatusService(
      req.params.id,
      req.user._id,
      req.body.status
    );

    res.status(200).json({ message: "Ride updated", ride });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requestRide,
  getRideHistory,
  getSingleRide,
};
