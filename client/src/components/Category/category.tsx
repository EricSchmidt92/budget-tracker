import { Category as TCategory } from "@/gql/graphql";
import { Accordion, Text } from "@mantine/core";
import accounting from "accounting";

interface CategoryProps {
  category: TCategory;
}

const Category = ({ category: { name, currentAmount, maxAmount, budgetItems } }: CategoryProps) => {
  const currentAmountColor = accounting.unformat(currentAmount) > accounting.unformat(maxAmount) ? "red" : "green";
  return (
    <Accordion.Item value={name}>
      <Accordion.Control>
        <Text>
          {name} -{" "}
          <Text component="span" color={currentAmountColor}>
            {currentAmount}
          </Text>{" "}
          / {maxAmount}
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        {budgetItems.map((item) => (
          <Text key={item.id}>
            {item.name} - {item.amount}
          </Text>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default Category;
