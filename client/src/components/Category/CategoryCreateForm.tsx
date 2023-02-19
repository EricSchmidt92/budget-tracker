import { graphql } from "@/gql";
import { GET_BUDGET } from "@/pages/budget/[id]";
import { Currency } from "@/types";
import { useMutation } from "@apollo/client";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import accounting from "accounting";

interface CategoryFormProps {
  budgetId: string;
  close: () => void;
  opened: boolean;
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

const CategoryCreateForm = ({ budgetId, opened, close }: CategoryFormProps) => {
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const form = useForm({
    initialValues: {
      name: "",
      maxAmount: 0,
    },
  });

  const handleAddCategory = async ({ name, maxAmount }: typeof form.values) => {
    const parsedMaxAmount = accounting.formatMoney(maxAmount) as Currency;

    await createCategory({
      variables: {
        createCategoryInput: {
          budgetId,
          name,
          maxAmount: parsedMaxAmount,
        },
      },

      onCompleted: ({ createCategory: { name } }) => {
        showNotification({
          title: "Success",
          message: `${name} Category created`,
        });
        handleOnClose();
      },

      onError: (error) => {
        showNotification({
          title: error.name,
          message: error.message,
          color: "red",
        });
      },

      refetchQueries: [{ query: GET_BUDGET, variables: { budgetId } }],
    });
  };

  const handleOnClose = () => {
    form.reset();
    close();
  };

  return (
    <Modal opened={opened} onClose={handleOnClose} size="md" title="Enter New Category">
      <form onSubmit={form.onSubmit((values) => handleAddCategory(values))}>
        <Stack spacing="xl">
          <TextInput withAsterisk label="Name" placeholder="Utilities" {...form.getInputProps("name")} />
          <TextInput
            withAsterisk
            label="Category Limit"
            placeholder="500"
            type="number"
            {...form.getInputProps("maxAmount")}
          />
          <Button type="submit">Create Category</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CategoryCreateForm;
