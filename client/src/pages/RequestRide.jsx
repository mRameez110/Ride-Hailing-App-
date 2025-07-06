import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../utils/errorHandler";

const RequestRide = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropLocation: "",
    rideType: "Bike",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/rides", formData);
      setMessage("Ride requested successfully!");
      showSuccessToast("Ride requested successfully!");
      navigate("/history");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to request ride");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Request a Ride</h2>

      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Drop-off Location</label>
          <input
            type="text"
            name="dropLocation"
            value={formData.dropLocation}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Ride Type</label>
          <select
            name="rideType"
            value={formData.rideType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Bike">Bike</option>
            <option value="Car">Car</option>
            <option value="Rickshaw">Rickshaw</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Request Ride
        </button>
      </form>
    </div>
  );
};

export default RequestRide;
