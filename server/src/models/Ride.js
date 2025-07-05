const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    dropLocation: {
      type: String,
      required: true,
    },
    rideType: {
      type: String,
      enum: ["Bike", "Car", "Rickshaw"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Requested", "Accepted", "In Progress", "Completed"],
      default: "Requested",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", rideSchema);
