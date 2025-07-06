import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getRideHistory } from "../utils/rideService";
import { showErrorToast, showSuccessToast } from "../utils/errorHandler";
import axiosInstance from "../utils/axiosInstance";

const RideHistory = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRides = async () => {
    try {
      const data = await getRideHistory();
      setRides(data);
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRideStatus = async (rideId, newStatus) => {
    try {
      await axiosInstance.post(`/rides/update-status/${rideId}`, {
        status: newStatus,
      });
      showSuccessToast("Ride status updated successfully");
      fetchRides();
    } catch (err) {
      showErrorToast(err);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  if (loading)
    return <p className="text-center mt-6">Loading ride history...</p>;

  if (rides.length === 0)
    return <p className="text-center mt-6">No rides found yet.</p>;

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100";
      case "Rejected":
        return "bg-red-100";
      case "In Progress":
        return "bg-yellow-100";
      case "Completed":
        return "bg-gray-200";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Ride History</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 text-sm">
              <th className="p-3">Sr#</th>
              <th className="p-3">Pickup</th>
              <th className="p-3">Drop-off</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Passenger</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride, index) => (
              <tr
                key={ride._id}
                className={`border-b text-sm hover:bg-gray-50 transition ${getStatusColor(
                  ride.status
                )}`}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{ride.pickupLocation}</td>
                <td className="p-3">{ride.dropLocation}</td>
                <td className="p-3">{ride.rideType}</td>
                <td className="p-3 capitalize">
                  {user.type === "driver" && ride.status !== "Completed" ? (
                    <select
                      value={ride.status}
                      onChange={(e) =>
                        updateRideStatus(ride._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      {ride.status === "Accepted" && (
                        <option value="Accepted">Accepted</option>
                      )}
                      {["Accepted", "In Progress"].includes(ride.status) && (
                        <option value="In Progress">In Progress</option>
                      )}
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    ride.status
                  )}
                </td>
                <td className="p-3">{ride.passenger?.name || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RideHistory;
