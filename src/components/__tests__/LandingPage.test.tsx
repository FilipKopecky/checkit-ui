import { renderWithProviders } from "../../utils/test-util";
import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "../LandingPage";
import { setupStore } from "../../store/CheckItStore";
import { changeLanguage } from "../../slices/languageSlice";
import Constants from "../../utils/Constants";

describe("Landing page", () => {
  test("Name of the app is present", async () => {
    renderWithProviders(<LandingPage />);
    expect(screen.getByText("CheckIt")).toBeInTheDocument();
  });
  test("Czech language forces the button to be in czech", async () => {
    const store = setupStore();
    store.dispatch(changeLanguage(Constants.LOCALES.CS));
    renderWithProviders(<LandingPage />, { store });
    expect(screen.getByText("Přihlásit se")).toBeInTheDocument();
  });
  test("Default setting should set the app for english speaking users", async () => {
    renderWithProviders(<LandingPage />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
