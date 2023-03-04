import { budgets } from "@/mocks/handlers";
import Home from "@/pages/index";
import { render, screen } from "@utils/test-utils";
import { escapeRegExp } from "@utils/utils";

const { name: budget1Name, id: budget1Id, maxAmount: budget1MaxAmount, description: budget1Description } = budgets[0];
const { name: budget2Name, id: budget2Id, maxAmount: budget2MaxAmount, description: budget2Description } = budgets[1];

describe("Home Page", () => {
  it("renders home page loading state", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /loading/i }));
  });

  it("budgets with name, max amount, and descriptions", async () => {
    render(<Home />);
    expect(await screen.findByText(new RegExp(budget1Name, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(escapeRegExp(budget1MaxAmount), "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(budget1Description!, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(budget2Name, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(escapeRegExp(budget2MaxAmount)))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(budget2Description!, "i"))).toBeInTheDocument();
  });
});
