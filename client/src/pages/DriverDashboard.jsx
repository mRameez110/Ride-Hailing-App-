import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { showSuccessToast, showErrorToast } from "../utils/errorHandler"; // ⬅️ import your global error handler
import CurrentRideStatus from "../components/CurrentRideStatus";

const DriverDashboard = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);

  const fetchRequestedRides = async () => {
    try {
      const res = await axiosInstance.get("/rides/pending");
      const requestedRides = res.data.rides.filter(
        (ride) => ride.status === "Requested"
      );
      setRides(requestedRides);
    } catch (err) {
      showErrorToast(err);
    }
  };

  const updateRideStatus = async (rideId, status) => {
    try {
      const res = await axiosInstance.post(`/rides/update-status/${rideId}`, {
        status,
      });
      showSuccessToast(`Ride ${status} successfully`);
      fetchRequestedRides();
    } catch (err) {
      console.error("Error updating ride status:", err);
      showErrorToast(err);
    }
  };

  useEffect(() => {
    if (user?.type === "driver") {
      fetchRequestedRides();
    }
  }, [user]);

  if (user?.type !== "driver") {
    return (
      <div className="text-center mt-12 text-red-600">
        You must be logged in as a driver to access this page.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Driver Dashboard</h2>

      <CurrentRideStatus />

      {rides.length === 0 ? (
        <p className="text-gray-500 text-center">
          No ride requests at the moment.
        </p>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2 text-center">
            Requested Rides
          </h2>

          {rides.map((ride) => (
            <div key={ride._id} className="border p-4 rounded-md bg-gray-50">
              <p>
                <strong>Passenger:</strong> {ride.passenger?.name || "N/A"}
              </p>
              <p>
                <strong>Pickup:</strong> {ride.pickupLocation}
              </p>
              <p>
                <strong>Drop-off:</strong> {ride.dropLocation}
              </p>
              <p>
                <strong>Type:</strong> {ride.rideType}
              </p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => updateRideStatus(ride._id, "Accepted")}
                  className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateRideStatus(ride._id, "Rejected")}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
