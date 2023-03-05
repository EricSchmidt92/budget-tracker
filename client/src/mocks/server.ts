import { setupServer } from "msw/node";
import { graphql } from "msw";
import { handlers } from "./handlers/handlers";

const server = setupServer(...handlers);
export { server, graphql };
