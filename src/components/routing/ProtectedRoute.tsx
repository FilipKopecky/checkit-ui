import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";

interface ProtectedRouteProps {
  permittedRole: string;
  redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  permittedRole,
  redirectPath,
}) => {
  const user = useAppSelector(selectUser);
  if (!user.roles.includes(permittedRole)) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
