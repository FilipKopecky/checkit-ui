import { renderWithProviders } from "../../../utils/test-util";
import { screen } from "@testing-library/react";
import React from "react";
import HomeNavigationButtons from "../HomeNavigationButtons";
import { setupStore } from "../../../store/CheckItStore";
import {
  generateCurrentAdminUser,
  generateCurrentUser,
} from "../../../utils/Generator";

describe("Home navigation buttons", () => {
  test("Should show administration button to admin users", async () => {
    const store = setupStore({
      user: generateCurrentAdminUser(),
    });
    renderWithProviders(<HomeNavigationButtons />, { store });
    expect(screen.getByText("Administration")).toBeInTheDocument();
  });
  test("Should not show administration button to normal users", async () => {
    const store = setupStore({
      user: generateCurrentUser(),
    });
    renderWithProviders(<HomeNavigationButtons />, { store });
    expect(screen.queryByText("Administration")).not.toBeInTheDocument();
  });
});
