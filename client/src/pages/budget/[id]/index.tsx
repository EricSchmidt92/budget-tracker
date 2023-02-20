import Category from "@/components/Category/Category";
import CategoryFormModal from "@/components/Category/CategoryFormModal";
import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";
import { Accordion, Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import accounting from "accounting";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Plus } from "tabler-icons-react";

export const GET_BUDGET = graphql(`
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
  const [opened, { close, open }] = useDisclosure(false);
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
    budget: { id, currentAmount, maxAmount, name, categories },
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
        <Button leftIcon={<Plus strokeWidth={1.5} />} onClick={open}>
          Add New Category
        </Button>
      </Group>

      <Stack w="60%" mt="xl">
        <Accordion variant="separated" chevronPosition="left">
          {categories.map((category) => (
            <Category key={category.id} category={category} budgetId={budgetId} />
          ))}
        </Accordion>
      </Stack>
      <CategoryFormModal opened={opened} close={close} budgetId={id} />
    </Box>
  );
};

export default BudgetPage;
