import { BudgetItem } from "@/gql/graphql";
import { Accordion, Badge, Group, Text } from "@mantine/core";

interface BudgetItemProps {
  budgetItem: BudgetItem;
}

const BudgetItem = ({ budgetItem: { name, amount, dueDate, paid, paidDate, note, id } }: BudgetItemProps) => {
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
          {paid ? <Badge color="green">Paid</Badge> : <Badge color="red">UnPaid</Badge>}
        </Group>
      </Accordion.Control>

      <Accordion.Panel p="xs">
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
        {note && (
          <Text weight={500}>
            Note:{" "}
            <Text component="span" color="dimmed" italic>
              {note}
            </Text>
          </Text>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default BudgetItem;
