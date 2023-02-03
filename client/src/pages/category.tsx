import { graphql } from "@/gql";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Group, Text, TextInput, Title } from "@mantine/core";

import React, { useState } from "react";
import { CirclePlus } from "tabler-icons-react";

const GET_CATEGORIES = graphql(`
  query Categories {
    categories {
      name
      id
    }
  }
`);

const CREATE_CATEGORY = graphql(`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      name
    }
  }
`);

const Category = () => {
  const {
    data: { categories } = {},
    loading,
    error,
  } = useQuery(GET_CATEGORIES);

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

    await createCategory({
      variables: {
        createCategoryInput: {
          name: newCategoryVal,
        },
      },
      refetchQueries: "active",
      onError: (error) => console.error("error submitting query: ", error),
      onCompleted: () => {
        setNewCategoryVal("");
        setInputError("");
      },
    });
  };

  return (
    <>
      <Title
        align="center"
        order={1}
        variant="gradient"
        gradient={{ from: "violet.9", to: "violet.4", deg: 45 }}
      >
        Categories
      </Title>
      {error && <Text>Error: {error.message} </Text>}
      {loading && <Text>loading categories</Text>}
      <Group my="lg" align="center">
        <TextInput
          type="text"
          radius="md"
          placeholder="Utilities"
          error={inputError}
          value={newCategoryVal}
          onChange={handleInputChange}
        />
        <Button
          leftIcon={<CirclePlus strokeWidth={1.6} size={20} />}
          size="xs"
          variant="light"
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </Group>
      {categories &&
        categories.map(({ id, name }) => <Box key={id}>{name}</Box>)}
    </>
  );
};

export default Category;
