import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";
import {
  Card,
  Center,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Head from "next/head";
import Link from "next/link";

const GET_BUDGETS = graphql(`
  query Budgets {
    budgets {
      id
      amount
      description
      name
    }
  }
`);

export default function Home() {
  const theme = useMantineTheme();
  const { data: { budgets } = {}, error } = useQuery(GET_BUDGETS);
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
        <>
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
          <SimpleGrid cols={3} w="70%" mt="lg" mx="auto">
            {budgets &&
              budgets.map(({ id, name, description }) => (
                <Card
                  key={id}
                  mih={140}
                  py="xl"
                  component={Link}
                  href={`/budget/${id}`}
                >
                  <Card.Section inheritPadding>
                    <Text
                      align="center"
                      weight="bold"
                      fz="lg"
                      color={theme.primaryColor}
                    >
                      {name}
                    </Text>
                  </Card.Section>
                  <Card.Section inheritPadding>{description}</Card.Section>
                </Card>
              ))}
          </SimpleGrid>
        </>
      </main>
    </>
  );
}
