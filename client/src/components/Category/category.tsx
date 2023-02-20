import { graphql } from "@/gql";
import { GET_BUDGET } from "@/pages/budget/[id]";
import { useMutation } from "@apollo/client";
import { Accordion, Box, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import accounting from "accounting";
import CategoryMenu from "./CategoryMenu";
import { CategoryProps, MenuAction, MenuItemSelectProps } from "./types";

const DELETE_CATEGORY = graphql(`
  mutation RemoveCategory($removeCategoryId: String!) {
    removeCategory(id: $removeCategoryId)
  }
`);

const Category = ({ category: { name, currentAmount, maxAmount, budgetItems, id }, budgetId }: CategoryProps) => {
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

  const handleMenuItemSelect = (props: MenuItemSelectProps) => {
    const { action } = props;

    switch (action) {
      case MenuAction.ADD_ITEM:
        console.log("add selected, not yet implemented");
        break;

      case MenuAction.EDIT_CATEGORY:
        console.log("trying to edit category...not yet implemented");
        break;

      case MenuAction.DELETE_CATEGORY:
        handleDeleteCategory();
        break;
    }
  };

  return (
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
  );
};

export default Category;
