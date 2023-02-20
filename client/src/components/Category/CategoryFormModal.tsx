import { graphql } from "@/gql";
import { GET_BUDGET } from "@/pages/budget/[id]";
import { Currency } from "@/types";
import { ApolloError, useMutation } from "@apollo/client";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import accounting from "accounting";

interface CategoryFormValues {
  name: string;
  maxAmount: number;
}

interface CategoryFormProps {
  budgetId: string;
  close: () => void;
  opened: boolean;
  values?: { categoryId: string; initialValues: CategoryFormValues };
}

interface UpdateCategoryProps {
  formValues: CategoryFormValues;
  categoryId: string;
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

const UPDATE_CATEGORY = graphql(`
  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput) {
      name
      id
    }
  }
`);

const CategoryFormModal = ({ budgetId, opened, close, values }: CategoryFormProps) => {
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  const initialValues = values ? values.initialValues : { maxAmount: 0, name: "" };

  const form = useForm<CategoryFormValues>({
    initialValues,
  });

  const handleSubmit = (formValues: CategoryFormValues) => {
    if (values !== undefined) {
      return handleUpdateCategory({ formValues, categoryId: values.categoryId });
    }

    return handleAddCategory(formValues);
  };

  const handleUpdateCategory = async ({ formValues: { name, maxAmount }, categoryId }: UpdateCategoryProps) => {
    const parsedMaxAmount = accounting.formatMoney(maxAmount) as Currency;

    await updateCategory({
      variables: {
        updateCategoryInput: {
          id: categoryId,
          budgetId,
          maxAmount: parsedMaxAmount,
          name,
        },
      },
      onCompleted: ({ updateCategory: { name } }) => {
        handleSuccess(`${name} Category updated`);
        handleOnClose();
      },
      onError: handleError,
      refetchQueries: [{ query: GET_BUDGET, variables: { budgetId } }],
    });
  };

  const handleAddCategory = async ({ name, maxAmount }: CategoryFormValues) => {
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
        handleSuccess(`${name} Category created`);
        handleOnClose();
      },
      onError: handleError,
      refetchQueries: [{ query: GET_BUDGET, variables: { budgetId } }],
    });
  };

  const handleSuccess = (message: string) => {
    showNotification({
      title: "Success",
      message,
    });
  };

  const handleError = (error: ApolloError) => {
    showNotification({
      title: error.name,
      message: error.message,
      color: "red",
    });
  };

  const handleOnClose = () => {
    form.reset();
    close();
  };

  return (
    <Modal opened={opened} onClose={handleOnClose} size="md" title="Enter New Category">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="xl">
          <TextInput withAsterisk label="Name" placeholder="Utilities" {...form.getInputProps("name")} />
          <TextInput
            withAsterisk
            label="Category Budget"
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

export default CategoryFormModal;
