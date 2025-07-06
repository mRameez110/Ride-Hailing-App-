// pages/DriverRides.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DriverRides = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.type !== "driver") return navigate("/");
    const fetchRequestedRides = async () => {
      try {
        const res = await axiosInstance.get("/rides/requested");
        setRides(res.data);
      } catch (err) {
        console.error("Error fetching requested rides", err);
      }
    };
    fetchRequestedRides();
  }, [user]);

  const handleUpdateStatus = async (rideId, newStatus) => {
    try {
      await axiosInstance.put(`/rides/${rideId}/status`, { status: newStatus });
      setRides((prev) =>
        prev.map((ride) =>
          ride._id === rideId ? { ...ride, status: newStatus } : ride
        )
      );
    } catch (err) {
      console.error("Error updating ride status", err);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Ride Requests</h2>
      {rides.length === 0 ? (
        <p>No requested rides.</p>
      ) : (
        rides.map((ride) => (
          <div
            key={ride._id}
            className="border p-4 rounded mb-4 shadow-sm bg-white"
          >
            <p>
              <strong>Pickup:</strong> {ride.pickup_location}
            </p>
            <p>
              <strong>Drop-off:</strong> {ride.drop_location}
            </p>
            <p>
              <strong>Type:</strong> {ride.ride_type}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{ride.status}</span>
            </p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleUpdateStatus(ride._id, "Accepted")}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdateStatus(ride._id, "Rejected")}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DriverRides;
