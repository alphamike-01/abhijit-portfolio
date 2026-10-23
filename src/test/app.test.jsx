import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("App Full Component Rendering", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container.innerHTML).not.toBe("");
    expect(container.textContent).toContain("Abhijit Mondal");
  });
});
