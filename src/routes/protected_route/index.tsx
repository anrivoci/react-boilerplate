import { Navigate, Outlet } from "react-router-dom";
//helpers
import { getAccessTokens } from "../../helpers";

export const ProtectedRoute = () => {
  const { access } = getAccessTokens();
  return access ? <Outlet /> : <Navigate to="/login" replace />;
};
