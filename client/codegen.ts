import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3001/graphql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        scalars: {
          USCurrency: "string",
          DateTime: "string",
        },
      },
    },
  },
};

export default config;
