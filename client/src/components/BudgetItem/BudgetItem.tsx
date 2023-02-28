import { graphql } from "@/gql";
import { BudgetItem as TBudgetItem } from "@/gql/graphql";
import { GET_BUDGET } from "@/pages/budget/[id]";
import { useMutation } from "@apollo/client";
import { Accordion, Badge, Button, Group, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { Edit, Trash } from "tabler-icons-react";

interface BudgetItemProps {
  budgetItem: TBudgetItem;
  budgetId: string;
}

const DELETE_BUDGET_ITEM = graphql(`
  mutation RemoveBudgetItem($removeBudgetItemId: String!) {
    removeBudgetItem(id: $removeBudgetItemId)
  }
`);

const BudgetItem = ({ budgetItem: { name, amount, dueDate, paid, paidDate, note, id }, budgetId }: BudgetItemProps) => {
  const [removeBudgetItemMutation] = useMutation(DELETE_BUDGET_ITEM);
  const { colorScheme } = useMantineColorScheme();
  const parseDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
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
      refetchQueries: [{ query: GET_BUDGET, variables: { budgetId } }],
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
                  {parseDate(dueDate)}
                </Text>
              </Text>
            )}
            {paidDate && (
              <Text weight={500}>
                Paid Date:{" "}
                <Text component="span" color="dimmed" italic>
                  {parseDate(paidDate)}
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
  );
};

export default BudgetItem;
