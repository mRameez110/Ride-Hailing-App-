import { useEffect, useState } from "react";
import RideRequestForm from "../components/RideRequestForm";
import RideHistory from "./RideHistory";
import { requestRide, getRides } from "../utils/rideService";
import CurrentRideStatus from "../components/CurrentRideStatus";
import { showErrorToast, showSuccessToast } from "../utils/errorHandler";
import { useNavigate } from "react-router-dom";

const PassengerDashboard = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const loadRides = async () => {
    try {
      const data = await getRides();
      setRides(data.rides);
    } catch (err) {
      console.error("Failed to fetch rides", err);
    }
  };

  const handleRideRequest = async (rideData) => {
    try {
      await requestRide(rideData);
      navigate("/history");
      showSuccessToast("Ride requested successfully!");
      await loadRides();
    } catch (err) {
      showErrorToast(err);
    }
  };

  useEffect(() => {
    loadRides();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <CurrentRideStatus />

      <div className="flex gap-4 my-6 justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Hide Ride Form" : "Request Ride"}
        </button>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showHistory ? "Hide History" : "View Ride History"}
        </button>
      </div>

      {showForm && <RideRequestForm onSubmit={handleRideRequest} />}
      {showHistory && <RideHistory rides={rides} />}
    </div>
  );
};

export default PassengerDashboard;
