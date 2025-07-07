import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { showSuccessToast } from "../utils/errorHandler";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showSuccessToast("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <img
            src="/jenny-logo.png"
            alt="Jeeny Logo"
            className="h-10 w-10 object-contain"
          />
          <Link
            to="/dashboard"
            className="text-2xl font-bold hover:text-gray-200"
          >
            Ride Booking
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-200">
                Dashboard
              </Link>

              {user.type !== "driver" && (
                <Link to="/request" className="hover:text-gray-200">
                  Request Ride
                </Link>
              )}

              <Link to="/history" className="hover:text-gray-200">
                Ride History
              </Link>

              {user.type === "driver" && (
                <Link to="/driver" className="hover:text-gray-200">
                  Driver Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
