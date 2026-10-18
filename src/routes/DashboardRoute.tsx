import { Navigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import Dashboard from "../pages/dashboard/Dashboard";

const DashboardRoute = () => {
  const { selectedProfileId } = useProfile();

  if (!selectedProfileId) return <Navigate to={"/profiles"} replace />;

  return <Dashboard profileId={selectedProfileId} />;
};

export default DashboardRoute;
