import { BudgetItem } from "@/gql/graphql";
import { Accordion, ActionIcon, Badge, Button, Group, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { Edit, Trash } from "tabler-icons-react";

interface BudgetItemProps {
  budgetItem: BudgetItem;
}

const BudgetItem = ({ budgetItem: { name, amount, dueDate, paid, paidDate, note, id } }: BudgetItemProps) => {
  const { colorScheme } = useMantineColorScheme();
  const parseDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
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
              <Button variant="light" size="sm" color="red.2" compact leftIcon={<Trash strokeWidth={1.5} size={18} />}>
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
