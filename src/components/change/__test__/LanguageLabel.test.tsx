import { renderWithProviders } from "../../../utils/test-util";
import React from "react";
import LanguageLabel from "../LanguageLabel";
import { generateObjectData } from "../../../utils/Generator";
import { screen } from "@testing-library/react";

describe("Language label", () => {
  test("Should show czech label if czech tag is present", async () => {
    const objectData = generateObjectData("cs");
    renderWithProviders(<LanguageLabel object={objectData} />);
    expect(screen.getByText("czech")).toBeInTheDocument();
  });
  test("Should show english label if english tag is present", async () => {
    const objectData = generateObjectData("en");
    renderWithProviders(<LanguageLabel object={objectData} />);
    expect(screen.getByText("english")).toBeInTheDocument();
  });
  test("Should show language tag if translation is not available", async () => {
    const objectData = generateObjectData("xz");
    renderWithProviders(<LanguageLabel object={objectData} />);
    expect(screen.getByText("xz")).toBeInTheDocument();
  });
});
