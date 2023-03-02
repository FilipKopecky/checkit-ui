import { renderWithProviders } from "../../../utils/test-util";
import { screen } from "@testing-library/react";
import React from "react";
import ProtectedRoute from "../ProtectedRoute";
import { setupStore } from "../../../store/CheckItStore";
import { UserState } from "../../../slices/userSlice";

describe("Protected route", () => {
  test("Unauthorized access should show unauthorized message", async () => {
    const mockedUser: UserState = {
      firstName: "test",
      id: "id123",
      isAdmin: false,
      lastName: "testovic",
      loggedIn: true,
      roles: ["ROLE_USER"],
      status: "idle",
    };
    const store = setupStore({ user: mockedUser });
    renderWithProviders(<ProtectedRoute permittedRole={"ROLE_ADMIN"} />, {
      store,
    });

    expect(screen.getByText(/Unauthorized /i)).toBeInTheDocument();
    expect(
      screen.queryByTestId("protected-route-content")
    ).not.toBeInTheDocument();
  });
  test("Authorized access should show routes content", async () => {
    const mockedUser: UserState = {
      firstName: "admin",
      id: "id123",
      isAdmin: true,
      lastName: "testovic",
      loggedIn: true,
      roles: ["ROLE_ADMIN"],
      status: "idle",
    };
    const store = setupStore({ user: mockedUser });
    renderWithProviders(<ProtectedRoute permittedRole={"ROLE_ADMIN"} />, {
      store,
    });
    expect(screen.queryByTestId("protected-route-content")).toBeInTheDocument();
  });
});
