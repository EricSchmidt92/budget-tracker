import { graphql } from "@/gql";
import { useMutation } from "@apollo/client";
import { ActionIcon, Group, TextInput } from "@mantine/core";

import { useState } from "react";
import { Checkbox, CircleX } from "tabler-icons-react";
import { Category } from "./types/types";

interface EditFormProps {
  onDoneEditing: (val: boolean) => void;
  category: Category;
}

const UPDATE_CATEGORY = graphql(`
  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput) {
      name
      id
    }
  }
`);

const CategoryEditForm = ({ onDoneEditing, category: { name: initialVal, id } }: EditFormProps) => {
  const errorMessage = "You must enter a category name or cancel";
  const [categoryName, setCategoryName] = useState(initialVal);
  const [error, setError] = useState("");
  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  const handleOnChange = (val: string) => {
    setCategoryName(val);

    if (val !== "") {
      setError("");
    }
  };

  const handleEditSubmit = async () => {
    if (categoryName === initialVal) {
      onDoneEditing(false);
      return;
    }

    if (categoryName.trim() === "") {
      setError(errorMessage);
      return;
    }

    await updateCategory({
      variables: {
        updateCategoryInput: {
          id,
          name: categoryName,
        },
      },
      refetchQueries: "active",
    });

    onDoneEditing(false);
  };
  return (
    <>
      <TextInput
        sx={{ flex: 2 }}
        error={error}
        value={categoryName}
        onChange={(e) => handleOnChange(e.currentTarget.value)}
        inputWrapperOrder={["error", "input"]}
      />
      <Group pt={error ? 20 : 0}>
        <ActionIcon onClick={handleEditSubmit} color="green" variant="light">
          <Checkbox strokeWidth={1.5} />
        </ActionIcon>
        <ActionIcon color="red" variant="light" onClick={() => onDoneEditing(false)}>
          <CircleX strokeWidth={1.5} />
        </ActionIcon>
      </Group>
    </>
  );
};

export default CategoryEditForm;
