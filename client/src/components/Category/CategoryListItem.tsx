import { graphql } from "@/gql";
import { useMutation } from "@apollo/client";
import { ActionIcon, Group, Text } from "@mantine/core";
import { useState } from "react";
import { Edit, Trash } from "tabler-icons-react";
import CategoryEditForm from "./CategoryEditForm";
import { Category } from "./types/types";

export interface ListItemProps {
  category: Category;
}

const REMOVE_CATEGORY = graphql(`
  mutation RemoveCategory($removeCategoryId: String!) {
    removeCategory(id: $removeCategoryId)
  }
`);

const CategoryListItem = ({ category }: ListItemProps) => {
  const { name, id } = category;
  const [isEditing, setIsEditing] = useState(false);
  const [removeCategory] = useMutation(REMOVE_CATEGORY);

  const handleDeleteCategory = async () => {
    await removeCategory({
      variables: {
        removeCategoryId: id,
      },
      refetchQueries: "active",
    });
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
