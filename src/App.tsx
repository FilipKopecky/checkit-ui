import React from "react";
import { ThemeProvider } from "@mui/material";
import Router from "./components/Router";
import theme from "./app/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { IntlProvider } from "react-intl";
import { useAppSelector } from "./hooks/ReduxHooks";
import { selectLanguage } from "./slices/languageSlice";

/**
 * Wrapper for the whole application
 * Used for providing contexts, routing, global styling etc...
 */
const App: React.FC = () => {
  const languageSelector = useAppSelector(selectLanguage);
  return (
    <IntlProvider
      locale={languageSelector.language}
      messages={languageSelector.messages}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
