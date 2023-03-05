import { budget } from "@/mocks/handlers/BudgetQuery";
import BudgetPage from "@/pages/budget/[id]/index";
import { render, screen } from "@utils/test-utils";
import { escapeRegExp } from "@utils/utils";

const { name, description, currentAmount, maxAmount } = budget;

describe("Budget index page", () => {
  it("renders loading state on initial page render", () => {
    render(<BudgetPage />);

    expect(screen.getByRole("heading", { name: /loading/i }));
  });

  it("renders budget details (name, description, current amount, max amount) correctly", async () => {
    render(<BudgetPage />);

    expect(await screen.findByText(new RegExp(name, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(description!, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(escapeRegExp(currentAmount), "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(escapeRegExp(maxAmount), "i"))).toBeInTheDocument();
  });

  it("Renders UI buttons correctly", async () => {
    render(<BudgetPage />);

    await screen.findByText(new RegExp(name, "i"));

    expect(screen.getByRole("button", { name: /add category/i }));
    expect(screen.getByRole("button", { name: /edit budget/i }));
    expect(screen.getByRole("button", { name: /delete budget/i }));
  });
});
