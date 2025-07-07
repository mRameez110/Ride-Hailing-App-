import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RideHistory from "./pages/RideHistory";
import RequestRide from "./pages/RequestRide";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute"; // 👈 New import
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";

const App = () => {
  const { loading } = useAuth();

  if (loading) return null;

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request" element={<RequestRide />} />
          <Route path="/history" element={<RideHistory />} />
        </Route>

        {/* 🔻 404 Not Found Route — must be at the END */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
