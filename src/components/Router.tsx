import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Landing from "../Landing";
import AuthLayout from "./routing/AuthLayout";
import ProtectedRoute from "./routing/ProtectedRoute";
import AdminPanel from "./AdminPanel";
import { getEnvVariable } from "../utils/environment";
import NotFoundPage from "./routing/NotFoundPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter basename={getEnvVariable("BASE_URL")}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AuthLayout />}>
          <Route
            element={
              <ProtectedRoute
                redirectPath={"/dashboard"}
                permittedRole={"ROLE_ADMIN"}
              />
            }
          >
            <Route path="adminOnly" element={<AdminPanel />} />
          </Route>
          <Route path="dashboard" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
