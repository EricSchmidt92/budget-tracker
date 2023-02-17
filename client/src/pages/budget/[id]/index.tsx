import Category from "@/components/Category/Category";
import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";
import { Accordion, Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import accounting from "accounting";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { CirclePlus } from "tabler-icons-react";

const GET_BUDGET = graphql(`
  query Budget($budgetId: String!) {
    budget(id: $budgetId) {
      currentAmount
      description
      id
      maxAmount
      name
      categories {
        name
        maxAmount
        id
        currentAmount
        budgetItems {
          amount
          dueDate
          id
          name
          note
          paid
          paidDate
        }
      }
    }
  }
`);

const BudgetPage: NextPage = () => {
  const { query } = useRouter();
  const budgetId = query.id as string;
  const { data, error, loading } = useQuery(GET_BUDGET, {
    variables: {
      budgetId,
    },
  });

  if (error) {
    return (
      <Title>
        {error.name} - {error.message}
      </Title>
    );
  }

  if (loading || !data) {
    return <Title>Loading</Title>;
  }

  const {
    budget: { currentAmount, maxAmount, name, categories },
  } = data;

  const currentAmountColor = accounting.unformat(currentAmount) > accounting.unformat(maxAmount) ? "red" : "green";

  return (
    <Box w="90%" h="100%" mx="auto">
      <Group position="apart">
        <Title order={1}>
          {name} -{" "}
          <Text component="span" color={currentAmountColor}>
            {currentAmount}
          </Text>{" "}
          / {maxAmount}
        </Title>
        <Button leftIcon={<CirclePlus strokeWidth={1.5} />}>Add New Category</Button>
      </Group>

      <Stack w="60%" mt="xl">
        <Accordion variant="separated">
          {categories.map((category) => (
            <>
              <Category key={category.id} category={category} />
            </>
          ))}
        </Accordion>
      </Stack>
    </Box>
  );
};

export default BudgetPage;
