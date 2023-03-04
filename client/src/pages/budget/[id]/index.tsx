import Category from "@/components/Category/Category";
import CategoryFormModal from "@/components/Category/CategoryFormModal";
import { graphql } from "@/gql";
import { GET_BUDGETS } from "@/pages";
import { useMutation, useQuery } from "@apollo/client";
import {
  Accordion,
  Alert,
  Box,
  Button,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import accounting from "accounting";
import BigNumber from "bignumber.js";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { AlertTriangle, Edit, Plus, Trash } from "tabler-icons-react";

export const GET_BUDGET = graphql(`
  query Budget($budgetId: String!) {
    budget(id: $budgetId) {
      currentAmount
      description
      id
      maxAmount
      name
      categories {
        id
        maxAmount
      }
    }
  }
`);

const REMOVE_BUDGET = graphql(`
  mutation RemoveBudget($removeBudgetId: String!) {
    removeBudget(id: $removeBudgetId) {
      id
      name
    }
  }
`);

const BudgetPage: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const router = useRouter();
  const [categoryFormOpened, { close: categoryFormClose, open: categoryFormOpen }] = useDisclosure(false);
  const { query } = useRouter();
  const budgetId = query.id as string;
  const { data, error, loading } = useQuery(GET_BUDGET, {
    variables: {
      budgetId,
    },
  });

  const [removeBudgetMutation] = useMutation(REMOVE_BUDGET);

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

  const unformattedMaxAmount = accounting.unformat(maxAmount);
  const currentAmountColor = accounting.unformat(currentAmount) > unformattedMaxAmount ? "red" : "green";
  const categoryMaxAmountSum = categories
    .reduce((accumulator, { maxAmount }) => {
      const parsedMaxAmount = accounting.unformat(maxAmount);
      return new BigNumber(parsedMaxAmount).plus(accumulator);
    }, new BigNumber(0))
    .toNumber();

  const overageAmount = accounting.formatMoney(categoryMaxAmountSum - unformattedMaxAmount);
  const isCategoryMaxError = categoryMaxAmountSum > unformattedMaxAmount;

  const removeBudget = async () => {
    await removeBudgetMutation({
      variables: {
        removeBudgetId: budgetId,
      },
      onCompleted: ({ removeBudget: { name } }) => {
        showNotification({
          title: "Success",
          message: `${name} Budget Removed Successfully`,
        });
        router.push("/");
      },
      onError: ({ name, message }) =>
        showNotification({
          title: `Error: ${name}`,
          message,
        }),
      refetchQueries: [GET_BUDGETS],
    });
  };

  const handleDeleteBudget = () => {
    openConfirmModal({
      title: "Confirm Delete Budget",
      children: (
        <Text>
          Are you sure you wish to delete this budget? You will lose all associated Category and Budget Item Data
        </Text>
      ),
      labels: { cancel: "Cancel", confirm: "Confirm" },
      onConfirm: removeBudget,
    });
  };
  return (
    <Box w="90%" h="100%" mx="auto">
      <Stack>
        <Group position="apart">
          <Title order={1}>
            {name} -{" "}
            <Text component="span" color={currentAmountColor}>
              {currentAmount}
            </Text>{" "}
            / {maxAmount}
          </Title>
          <Group>
            <Button size="xs" leftIcon={<Plus strokeWidth={1.5} />} onClick={categoryFormOpen}>
              Add Category
            </Button>
            <Button
              size="xs"
              leftIcon={<Edit strokeWidth={1.5} />}
              onClick={() => router.push(`/budget/${budgetId}/edit`)}
            >
              Edit Budget
            </Button>
            <Button size="xs" leftIcon={<Trash strokeWidth={1.5} />} onClick={handleDeleteBudget}>
              Delete Budget
            </Button>
          </Group>
        </Group>

        {isCategoryMaxError && (
          <Alert
            title="Category and Budget mismatch"
            color="red"
            w="60%"
            icon={<AlertTriangle strokeWidth={1.5} />}
            variant={colorScheme === "dark" ? "outline" : "light"}
          >
            <Text>The amount you set for your budget is being exceeded by the max amounts for your categories</Text>
            <SimpleGrid w="40%" cols={2} my="lg" spacing="sm" verticalSpacing="xs">
              <Text>Categories Budget total:</Text>{" "}
              <Text align="right">{accounting.formatMoney(categoryMaxAmountSum)}</Text>
              <Text>Budget Amount:</Text> <Text align="right">{maxAmount}</Text>
              <Box></Box>
              <Divider w="100%" sx={{ alignSelf: "flex-end" }} />
              <Text>Overage Amount:</Text> <Text align="right">{overageAmount}</Text>
            </SimpleGrid>
          </Alert>
        )}
      </Stack>

      <Stack w="60%" mt="xl">
        <Accordion variant="separated" chevronPosition="left">
          {categories.map(({ id }) => (
            <Category key={id} categoryId={id} budgetId={budgetId} />
          ))}
        </Accordion>
      </Stack>
      <CategoryFormModal opened={categoryFormOpened} close={categoryFormClose} budgetId={id} />
    </Box>
  );
};

export default BudgetPage;
