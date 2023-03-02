import { graphql } from "@/gql";
import { GET_BUDGET } from "@/pages/budget/[id]";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Box, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import accounting from "accounting";
import { ChevronsUp } from "tabler-icons-react";
import BudgetItem from "../BudgetItem/BudgetItem";
import BudgetItemFormModal from "../BudgetItem/BudgetItemFormModal";
import CategoryFormModal from "./CategoryFormModal";
import CategoryMenu from "./CategoryMenu";

export interface CategoryProps {
  categoryId: string;
  budgetId: string;
}

export enum MenuAction {
  ADD_ITEM = `Add Item`,
  EDIT_CATEGORY = "Edit Category",
  DELETE_CATEGORY = "Delete Category",
}

const DELETE_CATEGORY = graphql(`
  mutation RemoveCategory($removeCategoryId: String!) {
    removeCategory(id: $removeCategoryId)
  }
`);

export const GET_CATEGORY = graphql(`
  query Category($categoryId: String!) {
    category(id: $categoryId) {
      id
      name
      currentAmount
      maxAmount
      budgetItems {
        id
      }
    }
  }
`);

const Category = ({ categoryId, budgetId }: CategoryProps) => {
  const [categoryOpened, { close: closeCategory, open: openCategory }] = useDisclosure(false);
  const [budgetItemOpened, { close: closeBudgetItem, open: openBudgetItem }] = useDisclosure(false);
  const { data, loading, error } = useQuery(GET_CATEGORY, { variables: { categoryId } });
  const [removeCategoryMutation] = useMutation(DELETE_CATEGORY);

  if (error) {
    return (
      <Title>
        {error.name} - {error.message}
      </Title>
    );
  }

  if (loading || !data) {
    return <Title>Loading</Title>;
  }

  const {
    category: { currentAmount, maxAmount, id, name, budgetItems },
  } = data;
  const currentAmountColor = accounting.unformat(currentAmount) > accounting.unformat(maxAmount) ? "red" : "green";

  const handleDeleteCategory = async () => {
    openConfirmModal({
      title: "Confirm delete category",
      children: <Text>Deleting a category will delete all budget items associated with it. Are you sure?</Text>,
      labels: { cancel: "Cancel", confirm: "Confirm" },
      onConfirm: () => removeCategory(),
    });
  };

  const removeCategory = async () => {
    await removeCategoryMutation({
      variables: {
        removeCategoryId: id,
      },

      onCompleted: () =>
        showNotification({
          title: "Success",
          message: "Category successfully deleted",
        }),

      onError: ({ name, message }) =>
        showNotification({
          title: `Error deleting category: ${name}`,
          message,
        }),
      refetchQueries: [
        { query: GET_BUDGET, variables: { budgetId } },
        { query: GET_CATEGORY, variables: { categoryId } },
      ],
    });
  };

  const handleMenuItemSelect = (action: MenuAction) => {
    switch (action) {
      case MenuAction.ADD_ITEM:
        openBudgetItem();
        break;

      case MenuAction.EDIT_CATEGORY:
        openCategory();
        break;

      case MenuAction.DELETE_CATEGORY:
        handleDeleteCategory();
        break;
    }
  };

  return (
    <>
      <Accordion.Item value={id} pr="sm">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Accordion.Control>
            <Text size="lg" weight={500}>
              {name} -{" "}
              <Text component="span" color={currentAmountColor}>
                {currentAmount}
              </Text>{" "}
              / {maxAmount}
            </Text>
          </Accordion.Control>

          <CategoryMenu onItemSelect={handleMenuItemSelect} />
        </Box>

        <Accordion.Panel>
          <Accordion variant="separated" chevron={<ChevronsUp strokeWidth={1.5} />}>
            {budgetItems.map(({ id }) => (
              <BudgetItem key={id} budgetId={budgetId} budgetItemId={id} categoryId={categoryId} />
            ))}
          </Accordion>
        </Accordion.Panel>
      </Accordion.Item>

      <CategoryFormModal
        budgetId={budgetId}
        close={closeCategory}
        opened={categoryOpened}
        values={{
          categoryId: id,
          initialValues: { maxAmount: accounting.unformat(maxAmount), name },
        }}
      />

      <BudgetItemFormModal budgetId={budgetId} categoryId={id} close={closeBudgetItem} opened={budgetItemOpened} />
    </>
  );
};

export default Category;
