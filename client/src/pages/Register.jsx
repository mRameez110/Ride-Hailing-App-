import { useState } from "react";
import { registerUser } from "../utils/authService";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/errorHandler";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "passenger",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(formData);
      showSuccessToast("Registration successful, please login");
      navigate("/login");
    } catch (err) {
      showErrorToast(err);
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            name="name"
            required
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            name="email"
            required
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            name="password"
            required
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Register As</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
          >
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
