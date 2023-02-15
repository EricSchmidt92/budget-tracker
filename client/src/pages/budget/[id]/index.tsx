import BudgetItem from "@/components/BudgetItem/BudgetItem";
import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";
import { Box, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import accounting from "accounting";
import { NextPage } from "next";
import { useRouter } from "next/router";

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
  const { primaryColor } = useMantineTheme();
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

  if (loading) {
    return <Title>Loading</Title>;
  }

  if (!data) {
    return <Title>Loading</Title>;
  }

  const {
    budget: { currentAmount, maxAmount, name, categories },
  } = data;

  const currentAmountColor = accounting.unformat(currentAmount) > accounting.unformat(maxAmount) ? "red" : "green";

  return (
    <Box w="100%" h="100%">
      <Title color={primaryColor} order={1} align="center">
        {name} -{" "}
        <Text component="span" color={currentAmountColor}>
          {currentAmount}
        </Text>{" "}
        / {maxAmount}
      </Title>

      <Stack w="60%" mx="auto">
        {categories.map(({ name, id, budgetItems }) => (
          <>
            <Title order={2} key={id}>
              {name}
            </Title>
            {budgetItems.map((budgetItem) => (
              <BudgetItem key={budgetItem.id} budgetItem={budgetItem} />
            ))}
          </>
        ))}
      </Stack>
    </Box>
  );
};

export default BudgetPage;
