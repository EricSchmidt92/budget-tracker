import Guard from "@/components/Guard";
import client from "@/constants/apollo-client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Guard excludedRoutes={["/login", "/signup"]}>
        <Component {...pageProps} />
      </Guard>
    </ApolloProvider>
  );
}
