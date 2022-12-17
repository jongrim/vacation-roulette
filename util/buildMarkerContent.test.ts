import React from "react";
import { render, screen } from "@testing-library/react";
import buildMarkerContent from "./buildMarkerContent";

describe("buildMarkerContent", () => {
  test("creates an HTML snippet describing the place", () => {
    const content = buildMarkerContent({
      name: "Cancun",
      formatted_address: "Under the sun",
    });
    const element = React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: content,
      },
    });
    render(element);
    expect(screen.getByText("Cancun")).toBeInTheDocument;
    expect(screen.getByText("Under the sun")).toBeInTheDocument;
  });
});
