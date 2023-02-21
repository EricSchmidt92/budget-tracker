import { graphql } from "@/gql";
import { Category as TCategory } from "@/gql/graphql";
import { GET_BUDGET } from "@/pages/budget/[id]";
import { useMutation } from "@apollo/client";
import { Accordion, Box, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import accounting from "accounting";
import BudgetItemFormModal from "../BudgetItem/BudgetItemFormModal";
import CategoryFormModal from "./CategoryFormModal";
import CategoryMenu from "./CategoryMenu";

export interface CategoryProps {
  category: TCategory;
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

const Category = ({ category: { name, currentAmount, maxAmount, budgetItems, id }, budgetId }: CategoryProps) => {
  const [categoryOpened, { close: closeCategory, open: openCategory }] = useDisclosure(false);
  const [budgetItemOpened, { close: closeBudgetItem, open: openBudgetItem }] = useDisclosure(false);
  const [removeCategoryMutation] = useMutation(DELETE_CATEGORY);
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
          message: message,
        }),
      refetchQueries: [{ query: GET_BUDGET, variables: { budgetId: budgetId } }],
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
      <Accordion.Item value={name} pr="sm" key={id}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Accordion.Control>
            <Text>
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
          {budgetItems.map((item) => (
            <Text key={item.id}>
              {item.name} - {item.amount}
            </Text>
          ))}
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

      <BudgetItemFormModal categoryId={id} close={closeBudgetItem} opened={budgetItemOpened} />
    </>
  );
};

export default Category;
