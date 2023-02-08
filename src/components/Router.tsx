import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../Root";
import ErrorPage from "./ErrorPage";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
