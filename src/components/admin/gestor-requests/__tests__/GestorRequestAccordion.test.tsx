import { renderWithProviders } from "../../../../utils/test-util";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import React from "react";
import { User } from "../../../../model/User";
import { Vocabulary } from "../../../../model/Vocabulary";
import GestorRequestAccordion from "../GestorRequestAccordion";

const mockedUser: User = {
  admin: false,
  firstName: "John",
  gestoredVocabularies: [],
  id: "",
  lastName: "Doe",
};

const mockedVocabulary: Vocabulary = {
  gestors: [],
  label: "Testing vocabulary",
  uri: "",
};

describe("Gestor request accordion ", () => {
  test("The label of requested vocabulary should be present", async () => {
    renderWithProviders(
      <GestorRequestAccordion
        vocabulary={mockedVocabulary}
        users={[mockedUser]}
      />
    );
    expect(screen.getByText(mockedVocabulary.label)).toBeInTheDocument();
  });
  test("Clicking on accordion should reveal user", async () => {
    renderWithProviders(
      <GestorRequestAccordion
        vocabulary={mockedVocabulary}
        users={[mockedUser]}
      />
    );
    const title = screen.getByText(mockedVocabulary.label);
    const askingUser = screen.queryByText(
      mockedUser.firstName + " " + mockedUser.lastName
    );
    expect(askingUser).toBeInTheDocument();
    expect(askingUser).not.toBeVisible();
    fireEvent.click(title);
    await waitFor(() => {
      expect(
        screen.getByText(mockedUser.firstName + " " + mockedUser.lastName)
      ).toBeVisible();
    });
  });
});
