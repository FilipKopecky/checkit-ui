import { renderWithProviders } from "../../../utils/test-util";
import { screen } from "@testing-library/react";
import React from "react";
import DeclineButton from "../DeclineButton";

describe("Decline button", () => {
  test("Should show decline text inside a button", async () => {
    renderWithProviders(<DeclineButton />);
    expect(screen.getByText("Reject")).toBeInTheDocument();
  });
});
