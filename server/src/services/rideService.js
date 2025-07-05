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

module.exports = {
  requestRideService,
  getRideHistoryService,
};
