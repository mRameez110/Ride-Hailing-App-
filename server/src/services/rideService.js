const Ride = require("../models/Ride");

const requestRideService = async (data, userId) => {
  const { pickupLocation, dropLocation, rideType } = data;

  const ride = await Ride.create({
    passenger: userId,
    pickupLocation,
    dropLocation,
    rideType,
  });

  return ride;
};

const getRideHistoryService = async (userId) => {
  const rides = await Ride.find({ passenger: userId }).sort({ createdAt: -1 });
  return rides;
};

const getSingleRideService = async (rideId) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error("Ride not found");
  return ride;
};

const updateRideStatusService = async (rideId, userId, status) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error("Ride not found");

  if (ride.driver && ride.driver.toString() !== userId.toString()) {
    throw new Error("Not authorized to update this ride");
  }

  if (status === "Accepted") {
    ride.driver = userId;
  }

  ride.status = status;
  await ride.save();
  return ride;
};

module.exports = {
  requestRideService,
  getRideHistoryService,
  getSingleRideService,
  updateRideStatusService,
  s,
};
