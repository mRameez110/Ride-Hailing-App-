import { useState } from "react";

const RideRequestForm = ({ onSubmit }) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState("Bike");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickup || !dropoff) return alert("All fields are required");

    const rideData = {
      pickupLocation: pickup, 
      dropLocation: dropoff, 
      rideType,
    };

    onSubmit(rideData);

    // Reset form
    setPickup("");
    setDropoff("");
    setRideType("Bike");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-6 shadow-md w-full max-w-lg mx-auto mt-8"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Request a Ride
      </h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Pickup Location</label>
        <input
          type="text"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder="e.g., Mall Road"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Drop-off Location</label>
        <input
          type="text"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          placeholder="e.g., Airport"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Ride Type</label>
        <select
          value={rideType}
          onChange={(e) => setRideType(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="Bike">Bike</option>
          <option value="Car">Car</option>
          <option value="Rickshaw">Rickshaw</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Request Ride
      </button>
    </form>
  );
};

export default RideRequestForm;
