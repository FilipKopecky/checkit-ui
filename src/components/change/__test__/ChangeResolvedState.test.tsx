import { renderWithProviders } from "../../../utils/test-util";
import React from "react";
import ChangeResolvedState from "../ChangeResolvedState";
import { generateChange } from "../../../utils/Generator";
import { vi, expect } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

describe("Change resolved state", () => {
  test("Should show accepted alert for approved change", async () => {
    const clear = vi.fn();
    const submitComment = vi.fn();
    const change = generateChange("APPROVED");
    renderWithProviders(
      <ChangeResolvedState
        change={change}
        handleClear={clear}
        handleSubmitDeclineMessage={submitComment}
      />
    );
    expect(screen.getByText("Accepted")).toBeInTheDocument();
  });
  test("Should show rejected alert for approved change", async () => {
    const clear = vi.fn();
    const submitComment = vi.fn();
    const change = generateChange("REJECTED");
    renderWithProviders(
      <ChangeResolvedState
        change={change}
        handleClear={clear}
        handleSubmitDeclineMessage={submitComment}
      />
    );
    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });
  test("Clicking on undo button should call clear function", async () => {
    const clear = vi.fn();
    const submitComment = vi.fn();
    const change = generateChange("APPROVED");
    renderWithProviders(
      <ChangeResolvedState
        change={change}
        handleClear={clear}
        handleSubmitDeclineMessage={submitComment}
      />
    );
    const button = screen.getByText("Undo");
    fireEvent.click(button);
    expect(clear).toBeCalled();
  });
  test("Should show acknowledged for seen rollbacks without undo button", async () => {
    const clear = vi.fn();
    const submitComment = vi.fn();
    const change = generateChange("SEEN", "ROLLBACKED");
    renderWithProviders(
      <ChangeResolvedState
        change={change}
        handleClear={clear}
        handleSubmitDeclineMessage={submitComment}
      />
    );
    expect(screen.queryByText("Undo")).not.toBeInTheDocument();
    expect(screen.getByText("Acknowledged")).toBeInTheDocument();
  });
});
