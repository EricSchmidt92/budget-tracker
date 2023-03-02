import { graphql } from "@/gql";
import { GET_BUDGET } from "@/pages/budget/[id]";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Badge, Button, Group, Stack, Text, Title, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import accounting from "accounting";
import { Edit, Trash } from "tabler-icons-react";
import { GET_CATEGORY } from "../Category/Category";
import BudgetItemFormModal from "./BudgetItemFormModal";

interface BudgetItemProps {
  budgetId: string;
  budgetItemId: string;
  categoryId: string;
}

const DELETE_BUDGET_ITEM = graphql(`
  mutation RemoveBudgetItem($removeBudgetItemId: String!) {
    removeBudgetItem(id: $removeBudgetItemId)
  }
`);

export const GET_BUDGET_ITEM = graphql(`
  query BudgetItem($budgetItemId: String!) {
    budgetItem(id: $budgetItemId) {
      amount
      dueDate
      id
      name
      note
      paid
      paidDate
    }
  }
`);

const BudgetItem = ({ budgetItemId, categoryId, budgetId }: BudgetItemProps) => {
  const [removeBudgetItemMutation] = useMutation(DELETE_BUDGET_ITEM);
  const { data, loading, error } = useQuery(GET_BUDGET_ITEM, { variables: { budgetItemId } });
  const [opened, { open, close }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();

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
    budgetItem: { id, amount, name, paid, paidDate, dueDate, note },
  } = data;

  const parseDateForDisplay = (date: string) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
    return formatter.format(new Date(date));
  };

  const parseDateForModal = (date: string) => {
    return new Date(date).toISOString().slice(0, 10);
  };

  const removeBudgetItem = async () => {
    await removeBudgetItemMutation({
      variables: {
        removeBudgetItemId: id,
      },
      onCompleted: () =>
        showNotification({
          title: "Success",
          message: "Budget item successfully deleted",
        }),
      onError: ({ name, message }) =>
        showNotification({
          title: `Error deleting budget item ${name}`,
          message,
        }),
      refetchQueries: [
        { query: GET_CATEGORY, variables: { categoryId } },
        { query: GET_BUDGET, variables: { budgetId } },
      ],
    });
  };

  const handleDeleteBudgetItem = () => {
    openConfirmModal({
      title: "Confirm Delete Budget Item",
      children: <Text>Are you sure you wish to delete this budget item?</Text>,
      labels: { cancel: "Cancel", confirm: "Confirm" },
      onConfirm: removeBudgetItem,
    });
  };

  return (
    <>
      <Accordion.Item value={id}>
        <Accordion.Control>
          <Group position="apart">
            <Text weight={500}>
              {name} - {amount}
            </Text>
            {paid ? (
              <Badge variant={colorScheme === "light" ? "filled" : undefined} color="green">
                Paid
              </Badge>
            ) : (
              <Badge variant={colorScheme === "light" ? "filled" : undefined} color="red">
                UnPaid
              </Badge>
            )}
          </Group>
        </Accordion.Control>

        <Accordion.Panel p="xs">
          <Stack spacing="xs">
            <Group>
              {dueDate && (
                <Text weight={500}>
                  Due Date:{" "}
                  <Text component="span" color="dimmed" italic>
                    {parseDateForDisplay(dueDate)}
                  </Text>
                </Text>
              )}
              {paidDate && (
                <Text weight={500}>
                  Paid Date:{" "}
                  <Text component="span" color="dimmed" italic>
                    {parseDateForDisplay(paidDate)}
                  </Text>
                </Text>
              )}
            </Group>
            <Group position="apart">
              {note && (
                <Text weight={500}>
                  Note:{" "}
                  <Text component="span" color="dimmed" italic>
                    {note}
                  </Text>
                </Text>
              )}
              <Group>
                <Button
                  variant="light"
                  size="sm"
                  color="yellow.2"
                  compact
                  leftIcon={<Edit strokeWidth={1.5} size={18} />}
                  onClick={open}
                >
                  Edit
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  color="red.2"
                  compact
                  leftIcon={<Trash strokeWidth={1.5} size={18} />}
                  onClick={() => handleDeleteBudgetItem()}
                >
                  Delete
                </Button>
              </Group>
            </Group>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
      <BudgetItemFormModal
        budgetId={budgetId}
        categoryId={categoryId}
        close={close}
        opened={opened}
        values={{
          budgetItemId: id,
          initialValues: {
            amount: accounting.unformat(amount),
            hasDueDate: dueDate ? true : false,
            name,
            paid,
            dueDate: dueDate ? parseDateForModal(dueDate) : undefined,
            note: note ? note : undefined,
            paidDate: paidDate ? parseDateForModal(paidDate) : undefined,
          },
        }}
      />
    </>
  );
};

export default BudgetItem;
