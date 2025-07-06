import React, { useEffect, useState } from "react";
import { getCurrentRide } from "../utils/rideService";
import { showErrorToast } from "../utils/errorHandler";

const CurrentRideStatus = () => {
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const data = await getCurrentRide();
        console.log("see active ride response ", data);
        setRide(data);
      } catch (err) {
        showErrorToast(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, []);

  if (loading) return <p className="text-center">Checking current ride...</p>;

  if (!ride)
    return <p className="text-center text-gray-500">No active ride found.</p>;

  return (
    <div className="bg-white shadow rounded p-4 my-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Current Ride</h2>
      <ul className="text-sm text-gray-700 space-y-1">
        <li>
          <strong>Pickup:</strong> {ride.pickupLocation}
        </li>
        <li>
          <strong>Drop-off:</strong> {ride.dropLocation}
        </li>
        <li>
          <strong>Type:</strong> {ride.rideType}
        </li>
        <li>
          <strong>Status:</strong> {ride.status}
        </li>
      </ul>
    </div>
  );
};

export default CurrentRideStatus;
