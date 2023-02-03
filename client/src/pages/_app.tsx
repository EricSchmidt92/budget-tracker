import Guard from "@/components/Guard";
import NavbarHeader from "@/components/NavbarHeader";
import NavbarMinimal from "@/components/NavbarMinimal";
import client from "@/constants/apollo-client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { getCookie, setCookie } from "cookies-next";
import NextApp, { AppContext, AppProps } from "next/app";
import { useState } from "react";

export default function App({
  Component,
  pageProps,
  ...props
}: AppProps & { colorScheme: ColorScheme }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };
  return (
    <ApolloProvider client={client}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: "violet",
          }}
        >
          <Guard excludedRoutes={["/login", "/signup"]}>
            <AppShell navbar={<NavbarMinimal />} header={<NavbarHeader />}>
              <Component {...pageProps} />
            </AppShell>
          </Guard>
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
