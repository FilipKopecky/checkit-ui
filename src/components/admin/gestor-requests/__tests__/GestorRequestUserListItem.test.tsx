import { renderWithProviders } from "../../../../utils/test-util";
import { fireEvent, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import React from "react";
import GestorRequestUserListItem from "../GestorRequestUserListItem";
import { User } from "../../../../model/User";

const mockedUser: User = {
  admin: false,
  firstName: "John",
  gestoredVocabularies: [],
  id: "",
  lastName: "Doe",
};

describe("Gestor request user list item", () => {
  test("In pending state request should show action buttons that call actions", async () => {
    const status = "pending";
    const fnAccept = vi.fn();
    const fnDecline = vi.fn();
    renderWithProviders(
      <GestorRequestUserListItem
        user={mockedUser}
        status={status}
        acceptAction={fnAccept}
        declineAction={fnDecline}
      />
    );

    expect(screen.getByText("Accept")).toBeInTheDocument();
    expect(screen.getByText("Reject")).toBeInTheDocument();

    const declinedBadge = screen.queryByText("Rejected");
    expect(declinedBadge).not.toBeInTheDocument();
    const accepteddBadge = screen.queryByText("Accepted");
    expect(accepteddBadge).not.toBeInTheDocument();

    const button = screen.getByText("Accept");
    fireEvent.click(button);
    expect(fnAccept).toBeCalled();
    expect(fnDecline).not.toBeCalled();
  });
  test("In accepted state there should not be any actions available", async () => {
    const status = "accepted";
    const fnAccept = vi.fn();
    const fnDecline = vi.fn();
    renderWithProviders(
      <GestorRequestUserListItem
        user={mockedUser}
        status={status}
        acceptAction={fnAccept}
        declineAction={fnDecline}
      />
    );

    const accepteddBadge = screen.getByText("Accepted");
    expect(accepteddBadge).toBeInTheDocument();

    const declinedBadge = screen.queryByText("Declined");
    expect(declinedBadge).not.toBeInTheDocument();

    const acceptButton = screen.queryByText("Accept");
    expect(acceptButton).not.toBeInTheDocument();

    const declineButton = screen.queryByText("Decline");
    expect(declineButton).not.toBeInTheDocument();

    fireEvent.click(accepteddBadge);
    expect(fnAccept).not.toBeCalled();
    expect(fnDecline).not.toBeCalled();
  });
  test("The user name should be visible ", async () => {
    const status = "accepted";
    const fnAccept = vi.fn();
    const fnDecline = vi.fn();
    renderWithProviders(
      <GestorRequestUserListItem
        user={mockedUser}
        status={status}
        acceptAction={fnAccept}
        declineAction={fnDecline}
      />
    );
    expect(
      screen.getByText(mockedUser.firstName + " " + mockedUser.lastName)
    ).toBeInTheDocument();
  });
});
