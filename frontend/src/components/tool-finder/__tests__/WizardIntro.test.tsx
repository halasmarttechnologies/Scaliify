import { render, screen, fireEvent } from "@testing-library/react";
import { WizardIntro } from "../WizardIntro";

describe("WizardIntro", () => {
  it("renders the heading", () => {
    render(<WizardIntro onStart={() => {}} />);
    expect(
      screen.getByText("Evaluate & Benchmark Your Next HR Software")
    ).toBeInTheDocument();
  });

  it("renders the Start Assessment button", () => {
    render(<WizardIntro onStart={() => {}} />);
    expect(
      screen.getByRole("button", { name: /start assessment/i })
    ).toBeInTheDocument();
  });

  it("calls onStart when the button is clicked", () => {
    const onStart = vi.fn();
    render(<WizardIntro onStart={onStart} />);
    fireEvent.click(screen.getByRole("button", { name: /start assessment/i }));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it("renders all 3 value cards", () => {
    render(<WizardIntro onStart={() => {}} />);
    expect(screen.getByText(/Unbiased Matching/)).toBeInTheDocument();
    expect(screen.getByText(/2-Minute Flow/)).toBeInTheDocument();
    expect(screen.getByText(/Instant Fit Scores/)).toBeInTheDocument();
  });
});
