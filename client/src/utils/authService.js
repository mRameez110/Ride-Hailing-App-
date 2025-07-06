import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api", // Change if needed
});

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};
