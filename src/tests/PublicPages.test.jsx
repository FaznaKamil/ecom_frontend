import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import About from "../pages/public/About.jsx";
import FAQ from "../pages/public/FAQ.jsx";
import Terms from "../pages/public/Terms.jsx";

describe("Public Content Pages", () => {
  it("renders About page with editorial story and pillars", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(screen.getByText(/the story of clicklanka/i)).toBeInTheDocument();
    expect(screen.getByText(/direct guild alliances/i)).toBeInTheDocument();
  });

  it("renders FAQ page with questions and knowledge base", () => {
    render(
      <BrowserRouter>
        <FAQ />
      </BrowserRouter>
    );

    expect(screen.getByText(/frequently answered/i)).toBeInTheDocument();
    expect(screen.getByText(/how does clicklanka verify the authenticity/i)).toBeInTheDocument();
  });

  it("renders Terms of Service page", () => {
    render(
      <BrowserRouter>
        <Terms />
      </BrowserRouter>
    );

    expect(screen.getByText(/terms of purchase & service/i)).toBeInTheDocument();
  });
});
