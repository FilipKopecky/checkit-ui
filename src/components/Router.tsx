import React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import Home from "./Home";
import LandingPage from "./LandingPage";
import AuthLayout from "./routing/AuthLayout";
import ProtectedRoute from "./routing/ProtectedRoute";
import { getEnvVariable } from "../utils/environment";
import NotFoundPage from "./routing/NotFoundPage";
import Routes from "../utils/Routes";

const AdminPanel = React.lazy(() => import("./admin/AdminPanel"));
const Publications = React.lazy(() => import("./Publications"));
const MyGestorRequests = React.lazy(() => import("./MyGestorRequests"));

const Router: React.FC = () => {
  return (
    <BrowserRouter basename={getEnvVariable("BASE_URL")}>
      <RouterRoutes>
        <Route path={Routes.DEFAULT} element={<LandingPage />} />
        <Route element={<AuthLayout />}>
          <Route element={<ProtectedRoute permittedRole={"ROLE_ADMIN"} />}>
            <Route path={Routes.ADMINISTRATION} element={<AdminPanel />} />
          </Route>
          <Route path={Routes.HOME} element={<Home />} />
          <Route path={Routes.PUBLICATIONS} element={<Publications />} />
          <Route path={Routes.REQUESTS} element={<MyGestorRequests />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Router;
