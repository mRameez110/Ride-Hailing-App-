import { useAuth } from "../context/AuthContext";
import PassengerDashboard from "./PassengerDashboard";
import DriverDashboard from "./DriverDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (user?.type === "driver") return <DriverDashboard />;
  return <PassengerDashboard />;
};

export default Dashboard;
