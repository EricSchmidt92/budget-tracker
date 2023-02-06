import Category from "@/pages/category";
import { render, screen, waitFor } from "@utils/test-utils";
import userEvent from "@testing-library/user-event";
import { categories } from "@/mocks/handlers";

const { name: category1Name, id: category1Id } = categories[0];
const { name: category2Name } = categories[1];
const category1Regex = new RegExp(category1Name, "i");
const category2Regex = new RegExp(category2Name, "i");

describe("Category Page", () => {
  it("Displays loading text properly", () => {
    render(<Category />);

    // TODO: change this once skeleton for loading is in place
    expect(screen.getByText(/loading categories/i));
  });

  it("renders correctly", async () => {
    render(<Category />);

    expect(await screen.findByText(category1Regex)).toBeInTheDocument();
    expect(await screen.findByText(category2Regex)).toBeInTheDocument();
  });

  it.todo("Add skeleton for loading category state and test it loads");

  it("Deletes a category then updates list", async () => {
    render(<Category />);

    expect(await screen.findByText(category1Regex)).toBeInTheDocument();
    expect(await screen.findByText(category2Regex)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", {
        name: /delete\-category\-category\-1/i,
      })
    );

    await waitFor(() =>
      expect(screen.queryByText(category1Regex)).not.toBeInTheDocument()
    );
  });

  it.todo("Test edit functionality");
});
