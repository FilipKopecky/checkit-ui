import { renderWithProviders } from "../../../utils/test-util";
import { screen } from "@testing-library/react";
import React from "react";
import AcceptButton from "../AcceptButton";

describe("Accept button", () => {
  test("Should show accept message when no label prop is provided", async () => {
    renderWithProviders(<AcceptButton />);
    expect(screen.getByText("Accept")).toBeInTheDocument();
  });
  test("Should show acknowledged message in the button body", async () => {
    renderWithProviders(<AcceptButton labelKey={"acknowledge-rollback"} />);
    expect(screen.getByText("I understand")).toBeInTheDocument();
  });
});
