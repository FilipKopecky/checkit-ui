import React from "react";
import { useAuth } from "../auth/hooks";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  permittedRole: string;
  redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  permittedRole,
  redirectPath,
}) => {
  const auth_data = useAuth();
  if (!auth_data.roles.includes(permittedRole)) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
