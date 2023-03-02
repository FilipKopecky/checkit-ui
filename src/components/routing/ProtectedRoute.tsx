import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";
import { Alert, AlertTitle } from "@mui/material";
import { useIntl } from "react-intl";

interface ProtectedRouteProps {
  permittedRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ permittedRole }) => {
  const user = useAppSelector(selectUser);
  const intl = useIntl();
  if (!user.roles.includes(permittedRole)) {
    return (
      <Alert severity="error">
        <AlertTitle>
          {intl.formatMessage({ id: "admin-panel-unauthorized-title" })}
        </AlertTitle>
        {intl.formatMessage({ id: "admin-panel-unauthorized-description" })}
      </Alert>
    );
  }
  return (
    <div data-testid="protected-route-content">
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
