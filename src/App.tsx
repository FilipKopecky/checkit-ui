import React from "react";
import { ThemeProvider } from "@mui/material";
import Router from "./components/Router";
import theme from "./app/theme";
import CssBaseline from "@mui/material/CssBaseline";

/**
 * Wrapper for the whole application
 * Used for providing contexts, routing, global styling etc...
 */
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};

export default App;
