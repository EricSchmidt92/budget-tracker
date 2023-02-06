import Home from "@/pages/index";
import { render, screen } from "@utils/test-utils";

describe("Home Page", () => {
  it("renders home page", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /welcome to the budget app/i }));
  });
});
