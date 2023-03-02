import { renderWithProviders } from "../../../utils/test-util";
import React from "react";
import AdminPanel from "../AdminPanel";
import { screen, waitFor } from "@testing-library/react";

describe("Admin panel", () => {
  test("Before loading components, suspense should be triggered", async () => {
    renderWithProviders(<AdminPanel />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByTestId("admin-panel-content")).not.toBeInTheDocument();
  });
  test("After loading components, its content should be displayed", async () => {
    renderWithProviders(<AdminPanel />);
    await waitFor(() =>
      expect(screen.queryByTestId("admin-panel-content")).toBeInTheDocument()
    );
  });
});
