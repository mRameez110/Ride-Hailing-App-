import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RideHistory from "./pages/RideHistory";
import RequestRide from "./pages/RequestRide";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>
      <Navbar />
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<RequestRide />} />
        <Route path="/history" element={<RideHistory />} />
      </Route>
    </Routes>
  );
};

export default App;
