const Ride = require("../models/rideModel");

exports.requestRideService = async (data, userId) => {
  const { pickupLocation, dropLocation, rideType } = data;

  const ride = await Ride.create({
    passenger: userId,
    pickupLocation,
    dropLocation,
    rideType,
  });

  return ride;
};

exports.getRideHistoryService = async (userId, userType) => {
  const query =
    userType === "driver" ? { driver: userId } : { passenger: userId };

  const rides = await Ride.find(query)
    .populate("passenger", "name")
    .sort({ createdAt: -1 });

  return rides;
};

exports.getPendingRidesService = async () => {
  const rides = await Ride.find({ status: "Requested" }).populate(
    "passenger",
    "name"
  );
  return rides;
};

exports.updateRideStatusService = async (rideId, status) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error("Ride not found");

  ride.status = status;

  // assign driver if accepting
  if (status === "Accepted" && !ride.driver) {
    ride.driver = ride.driver || ride.passenger; // optional fallback
  }

  await ride.save();
  return ride;
};

exports.getCurrentRideService = async (userId, userType) => {
  const query =
    userType === "driver"
      ? { driver: userId, status: "In Progress" }
      : { passenger: userId, status: "In Progress" };

  const ride = await Ride.findOne(query);
  return ride;
};
