import React from "react";
import { ThemeProvider } from "@mui/material";
import Router from "./components/Router";
import theme from "./app/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { IntlProvider } from "react-intl";
import { useAppSelector } from "./hooks/ReduxHooks";
import { selectLanguage } from "./slices/languageSlice";
import { SnackbarProvider } from "notistack";

/**
 * Wrapper for the whole application
 * Used for providing contexts, routing, global styling etc...
 */
const App: React.FC = () => {
  const languageSelector = useAppSelector(selectLanguage);
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <IntlProvider
        locale={languageSelector.language}
        messages={languageSelector.messages}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </IntlProvider>
    </SnackbarProvider>
  );
};

export default App;