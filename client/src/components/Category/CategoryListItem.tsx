import { graphql } from "@/gql";
import { GET_CATEGORIES } from "@/pages/category";
import { useMutation } from "@apollo/client";
import { ActionIcon, Group, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { Edit, Trash } from "tabler-icons-react";
import CategoryEditForm from "./CategoryEditForm";
import { Category } from "./types/types";

export interface ListItemProps {
  category: Category;
}

export const REMOVE_CATEGORY = graphql(`
  mutation RemoveCategory($removeCategoryId: String!) {
    removeCategory(id: $removeCategoryId)
  }
`);

const CategoryListItem = ({ category }: ListItemProps) => {
  const { name, id } = category;
  const [isEditing, setIsEditing] = useState(false);
  const [removeCategory] = useMutation(REMOVE_CATEGORY);

  const handleDeleteCategory = async () => {
    try {
      await removeCategory({
        variables: {
          removeCategoryId: id,
        },
        refetchQueries: [{ query: GET_CATEGORIES }],
      });
      showNotification({
        title: "Delete successful",
        message: "The category was successfully deleted",
      });
    } catch (error) {
      showNotification({
        title: "Error",
        message: "There was an error deleting the category",
        color: "red",
      });
    }
  };

  return (
    <Group w="100%">
      {isEditing ? (
        <CategoryEditForm
          category={category}
          onDoneEditing={(val: boolean) => setIsEditing(val)}
        />
      ) : (
        <>
          <Text sx={{ flex: 2 }}>{name}</Text>
          <Group>
            <ActionIcon
              color="yellow"
              variant="subtle"
              onClick={() => setIsEditing(true)}
            >
              <Edit strokeWidth={1.5} />
            </ActionIcon>
            <ActionIcon
              role="button"
              data-testid={`delete-category-${id}`}
              aria-label={`delete-category-${id}`}
              color="red"
              variant="subtle"
              onClick={handleDeleteCategory}
            >
              <Trash strokeWidth={1.5} />
            </ActionIcon>
          </Group>
        </>
      )}
    </Group>
  );
};

export default CategoryListItem;
