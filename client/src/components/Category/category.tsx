import CategoryContainer from "@/components/Category/CategoryContainer";
import { graphql } from "@/gql";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Center, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import React, { useState } from "react";
import { CirclePlus } from "tabler-icons-react";

//TODO: possibly reuse this component from the budget page to change categories?

export const GET_CATEGORIES = graphql(`
  query Categories($budgetId: String!) {
    categories(budgetId: $budgetId) {
      currentAmount
      maxAmount
      name
      id
    }
  }
`);

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

const Category = () => {
  const { data: { categories } = {}, loading, error } = useQuery(GET_CATEGORIES);

  const [createCategory] = useMutation(CREATE_CATEGORY);

  const [newCategoryVal, setNewCategoryVal] = useState("");
  const [inputError, setInputError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryVal(event.currentTarget.value);
    setInputError("");
  };

  const handleAddCategory = async () => {
    if (newCategoryVal.length < 1) {
      setInputError("Category name cannot be blank");
      return;
    }
    try {
      await createCategory({
        variables: {
          createCategoryInput: {
            name: newCategoryVal,
            budgetId: "",
          },
        },
        refetchQueries: [{ query: GET_CATEGORIES }],
        onError: (error) => console.error("error submitting query: ", error),
        onCompleted: () => {
          setNewCategoryVal("");
          setInputError("");
        },
      });

      showNotification({
        title: "Success",
        message: "Category successfully added",
      });
    } catch (error) {
      showNotification({
        title: "Error",
        message: "An error occurred while adding the category",
        color: "red",
      });
    }
  };

  return (
    <>
      <Title align="center" order={1} variant="gradient" gradient={{ from: "violet.9", to: "violet.4", deg: 45 }}>
        Categories
      </Title>
      <Center>
        <Stack justify="center" align="start">
          {error && <Text>Error: {error.message} </Text>}
          <Group my="lg" align="center">
            <TextInput
              type="text"
              radius="md"
              placeholder="Utilities"
              aria-label="Add Category"
              error={inputError}
              value={newCategoryVal}
              onChange={handleInputChange}
            />
            <Button leftIcon={<CirclePlus strokeWidth={1.6} size={20} />} size="xs" onClick={handleAddCategory}>
              Add Category
            </Button>
          </Group>
          {loading && <Text>loading categories</Text>}
          {categories && <CategoryContainer categories={categories} />}
        </Stack>
      </Center>
    </>
  );
};

export default Category;
