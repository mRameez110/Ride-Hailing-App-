// src/services/rideService.js

import axiosInstance from "./axiosInstance";

export const getRideHistory = async () => {
  const res = await axiosInstance.get("/rides");
  return res.data.rides;
};

  export const getCurrentRide = async () => {
    const res = await axiosInstance.get("/rides/current");
    console.log("see response of current ride ", res);
    return res.data.ride;
  };

export const requestRide = async (rideData) => {
  const res = await axiosInstance.post("/rides", rideData);
  console.log("see ride request response ", res.data);
  return res.data;
};

export const getRides = async () => {
  const res = await axiosInstance.get("/rides");
  return res.data;
};
