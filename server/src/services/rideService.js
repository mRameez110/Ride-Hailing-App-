const Ride = require("../models/Ride");

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
  console.log("User ID and Type in ride history service", userId, userType);
  const query =
    userType === "driver" ? { driver: userId } : { passenger: userId };

  const rides = await Ride.find()
    .populate("passenger", "name")
    .sort({ createdAt: -1 });

  console.log("check ride history", rides);

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
  if (status === "Accepted" && !ride.driver) {
    ride.driver = ride.driver || ride.passenger;
  }
  await ride.save();
  console.log("see updated ride", ride);
  return ride;
};

exports.getCurrentRideService = async (userId, userType) => {
  // const query =
  //   userType === "driver"
  //     ? { driver: userId, status: "In Progress" }
  //     : { passenger: userId, status: "In Progress" };

  const query = { status: "In Progress" };
  const ride = await Ride.findOne(query);
  return ride;
};
