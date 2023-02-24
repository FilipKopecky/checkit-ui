import React from "react";
import { ThemeProvider } from "@mui/material";
import Router from "./components/Router";
import theme from "./app/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { IntlProvider } from "react-intl";
import messages_cs from "./translations/cs.json";
import messages_en from "./translations/en.json";

/**
 * TODO: Write some util function with predefined language keys
 *  The state should be in Redux + calling a change of language should store the language key in local storage
 *  Redux should use selector with default value which is going to come from the local storage, if none found use the navigator value
 *  sources: https://blog.logrocket.com/react-intl-internationalize-your-react-apps/
 *  https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-react-app-with-react-intl
 */

const messages={
    'cs': messages_cs,
    'en': messages_en
}

/**
 * Wrapper for the whole application
 * Used for providing contexts, routing, global styling etc...
 */
const App: React.FC = () => {
  return (
    <IntlProvider locale={'en'} messages={messages['en']}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
