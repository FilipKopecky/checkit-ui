import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./components/Router";
import { Auth } from "./components/auth/components";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth>
      <Router />
    </Auth>
  </React.StrictMode>
);
