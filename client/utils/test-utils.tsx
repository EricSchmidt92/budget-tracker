import authenticatedVar from "@/constants/authenticated";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { render, RenderOptions } from "@testing-library/react";
import fetch from "cross-fetch";
import { FC, ReactElement, ReactNode } from "react";

const httpLink = new HttpLink({
  fetch,
  uri: `http://localhost:3001/graphql`,
  credentials: "same-origin",
});

const logoutLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors?.length && (graphQLErrors[0].extensions?.response as any)?.statusCode === 401) {
    authenticatedVar(false);
  }

  if (networkError) {
    console.log("network error: ", networkError);
  }
});

export const mockClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

const WithProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ApolloProvider client={mockClient}>
      <ColorSchemeProvider colorScheme="dark" toggleColorScheme={() => {}}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ primaryColor: "violet" }}>
          <NotificationsProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </ApolloProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: WithProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
