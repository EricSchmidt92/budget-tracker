import type { CodegenConfig } from "@graphql-codegen/cli";
import { USCurrencyResolver } from "graphql-scalars";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3001/graphql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [
        {
          add: {
            content: "import { USCurrencyResolver } from 'graphql-scalars';",
          },
        },
        "typescript",
      ],
      config: {
        scalars: {
          USCurrency: USCurrencyResolver,
        },
      },
    },
  },
};

export default config;
