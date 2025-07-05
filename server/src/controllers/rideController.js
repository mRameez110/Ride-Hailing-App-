const { requestRideService } = require("../services/rideService");

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

