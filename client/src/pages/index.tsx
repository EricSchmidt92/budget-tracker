import { Center, Title } from "@mantine/core";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Budget Tracker</title>
        <meta
          name="description"
          content="Made to help you stay within your budget"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Center>
          <Title
            order={1}
            align="center"
            variant="gradient"
            gradient={{ from: "violet", to: "pink", deg: 45 }}
          >
            Welcome to the Budget App
          </Title>
        </Center>
      </main>
    </>
  );
}
