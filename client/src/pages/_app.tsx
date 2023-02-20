import Guard from "@/components/Guard";
import NavbarHeader from "@/components/NavbarHeader";
import client from "@/constants/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { getCookie, setCookie } from "cookies-next";
import NextApp, { AppContext, AppProps } from "next/app";
import { useState } from "react";

//TODO: look into root provider...that provides providers

export default function App({ Component, pageProps, ...props }: AppProps & { colorScheme: ColorScheme }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };
  return (
    <ApolloProvider client={client}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: "violet",
          }}
        >
          <NotificationsProvider>
            <ModalsProvider>
              <Guard excludedRoutes={["/login", "/signup"]}>
                <AppShell header={<NavbarHeader />}>
                  <Component {...pageProps} />
                </AppShell>
              </Guard>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </ApolloProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "dark",
  };
};
