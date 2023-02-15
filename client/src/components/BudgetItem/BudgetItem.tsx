import { BudgetItem } from "@/gql/graphql";
import { Text } from "@mantine/core";
import React from "react";

interface BudgetItemProps {
  budgetItem: BudgetItem;
}

const BudgetItem = ({ budgetItem: { name } }: BudgetItemProps) => {
  return <Text ml="md">{name}</Text>;
};

export default BudgetItem;
