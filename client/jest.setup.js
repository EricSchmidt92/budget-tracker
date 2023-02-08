import "@testing-library/jest-dom/extend-expect";
import { resetCategories } from "./src/mocks/handlers";
import { server } from "./src/mocks/server";
import { mockClient } from "./utils/test-utils";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

beforeEach(() => {
  mockClient.clearStore();
  resetCategories();
});

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
