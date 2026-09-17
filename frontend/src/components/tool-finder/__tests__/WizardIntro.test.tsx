import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { WizardIntro } from "../WizardIntro";
import messages from "../../../../messages/en.json";

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe("WizardIntro", () => {
  it("renders the heading", () => {
    renderWithIntl(<WizardIntro onStart={() => {}} />);
    expect(
      screen.getByRole("heading", { name: /find your perfect hr software/i })
    ).toBeInTheDocument();
  });

  it("renders the Start Assessment button", () => {
    renderWithIntl(<WizardIntro onStart={() => {}} />);
    expect(
      screen.getByRole("button", { name: /start assessment/i })
    ).toBeInTheDocument();
  });

  it("calls onStart when the button is clicked", () => {
    const onStart = vi.fn();
    renderWithIntl(<WizardIntro onStart={onStart} />);
    fireEvent.click(screen.getByRole("button", { name: /start assessment/i }));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it("renders all 3 value cards", () => {
    renderWithIntl(<WizardIntro onStart={() => {}} />);
    expect(screen.getByText(/Unbiased Matching/)).toBeInTheDocument();
    expect(screen.getByText(/2-Minute Flow/)).toBeInTheDocument();
    expect(screen.getByText(/Instant Fit Scores/)).toBeInTheDocument();
  });
});
