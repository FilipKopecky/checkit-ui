import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { setupStore } from "../store/CheckItStore";
import type { AppStore, RootState } from "../store/CheckItStore";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "@mui/material";
import theme from "../app/theme";
import { BrowserRouter } from "react-router-dom";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <IntlProvider
          locale={store?.getState().language.language}
          messages={store?.getState().language.messages}
        >
          <ThemeProvider theme={theme}>
            <BrowserRouter>{children}</BrowserRouter>
          </ThemeProvider>
        </IntlProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
