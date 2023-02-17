import { graphql } from "@/gql";
import { Currency } from "@/types";
import { useMutation } from "@apollo/client";
import { Box, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import accounting from "accounting";
import React from "react";

interface CategoryFormProps {
  budgetId: string;
}

const CREATE_CATEGORY = graphql(`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      currentAmount
      id
      maxAmount
      name
    }
  }
`);

const CategoryCreateForm = ({ budgetId }: CategoryFormProps) => {
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const form = useForm({
    initialValues: {
      name: "",
      maxAmount: 0,
    },
  });

  const handleAddCategory = async ({ name, maxAmount }: typeof form.values) => {
    console.log("you called the handleAddCategory function with the values of: ", [name, maxAmount]);

    const parsedMaxAmount = accounting.formatMoney(maxAmount) as Currency;
    await createCategory({
      variables: {
        createCategoryInput: {
          budgetId,
          name,
          maxAmount: parsedMaxAmount,
        },
      },
    });
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => handleAddCategory(values))}>
        <Group>
          <TextInput withAsterisk label="Name" placeholder="Utilities" {...form.getInputProps("name")} />
          <TextInput
            withAsterisk
            label="Category Limit"
            placeholder="500"
            type="number"
            {...form.getInputProps("maxAmount")}
          />
        </Group>
      </form>
    </Box>
  );
};

export default CategoryCreateForm;
