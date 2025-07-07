import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Ride Booking App</h1>
      <p className="text-lg mb-6 text-gray-700">
        Book your ride quickly and easily. Login or Register to get started.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
