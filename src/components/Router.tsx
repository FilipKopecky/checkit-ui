import React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import Home from "./Home";
import LandingPage from "./LandingPage";
import AuthLayout from "./routing/AuthLayout";
import ProtectedRoute from "./routing/ProtectedRoute";
import { getEnvVariable } from "../utils/environment";
import NotFoundPage from "./routing/NotFoundPage";
import Routes from "../utils/Routes";
import PublicationSummary from "./publications/PublicationSummary";
import PublicationReviewVocabulary from "./publications/PublicationReviewVocabulary";

const AdminPanel = React.lazy(() => import("./admin/AdminPanel"));
const Publications = React.lazy(() => import("./Publications"));
const CurrentUserSummary = React.lazy(() => import("./CurrentUserSummary"));

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
          <Route
            path={`${Routes.PUBLICATIONS}/:publicationId`}
            element={<PublicationSummary />}
          />
          <Route
            path={`${Routes.PUBLICATIONS}/:publicationId/vocabulary`}
            element={<PublicationReviewVocabulary />}
          />
          <Route path={Routes.REQUESTS} element={<CurrentUserSummary />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Router;
