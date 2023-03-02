import { graphql } from "@/gql";
import { CreateBudgetItemInput, UpdateBudgetItemInput } from "@/gql/graphql";
import { GET_BUDGET } from "@/pages/budget/[id]";
import { ApolloError, useMutation } from "@apollo/client";
import { Button, Checkbox, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import accounting from "accounting";
import { GET_CATEGORY } from "../Category/Category";
import { GET_BUDGET_ITEM } from "./BudgetItem";

interface BudgetItemFormProps {
  budgetId: string;
  categoryId: string;
  close: () => void;
  opened: boolean;
  values?: {
    budgetItemId: string;
    initialValues: BudgetItemFormValues;
  };
}
interface BudgetItemFormValues {
  name: string;
  amount: number;
  hasDueDate: boolean;
  dueDate?: string;
  paidDate?: string;
  paid: boolean;
  note?: string;
}

type SubmitBudgetItemValues = Omit<CreateBudgetItemInput, "categoryId">;

const CREATE_BUDGET_ITEM = graphql(`
  mutation CreateBudgetItem($createBudgetItemInput: CreateBudgetItemInput!) {
    createBudgetItem(createBudgetItemInput: $createBudgetItemInput) {
      id
      name
    }
  }
`);

const UPDATE_BUDGET_ITEM = graphql(`
  mutation UpdateBudgetItem($updateBudgetItemInput: UpdateBudgetItemInput!) {
    updateBudgetItem(updateBudgetItemInput: $updateBudgetItemInput) {
      name
      id
    }
  }
`);

const BudgetItemFormModal = ({ opened, close, values, categoryId, budgetId }: BudgetItemFormProps) => {
  const [createBudgetItem] = useMutation(CREATE_BUDGET_ITEM);
  const [updateBudgetItem] = useMutation(UPDATE_BUDGET_ITEM);
  const operation = values !== undefined ? "Update" : "Create";
  const initialValues = values
    ? values.initialValues
    : {
        name: "",
        amount: 0,
        hasDueDate: false,
        dueDate: new Date().toISOString().slice(0, 10),
        paidDate: new Date().toISOString().slice(0, 10),
        paid: false,
        note: "",
      };

  const form = useForm<BudgetItemFormValues>({
    initialValues: {
      ...initialValues,
      note: "",
    },
  });

  const parseFormValues = (formValues: BudgetItemFormValues): SubmitBudgetItemValues => {
    const { paid, hasDueDate, paidDate, dueDate, amount, note, name } = formValues;

    return {
      paid,
      paidDate: paid ? paidDate : undefined,
      dueDate: hasDueDate ? dueDate : undefined,
      amount: accounting.formatMoney(amount),
      note: note ? note : undefined,
      name,
    };
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

    close();
  };

  const handleAddBudgetItem = async ({ categoryId, ...values }: CreateBudgetItemInput) => {
    await createBudgetItem({
      variables: {
        createBudgetItemInput: {
          categoryId,
          ...values,
        },
      },
      onCompleted: ({ createBudgetItem: { name } }) => {
        handleSuccess(`${name} Budget item created`);
        close();
        form.reset();
      },
      onError: handleError,
      refetchQueries: [
        { query: GET_CATEGORY, variables: { categoryId } },
        { query: GET_BUDGET, variables: { budgetId } },
      ],
    });
  };

  const handleUpdateBudgetItem = async ({ id, ...values }: UpdateBudgetItemInput) => {
    await updateBudgetItem({
      variables: {
        updateBudgetItemInput: {
          id,
          ...values,
        },
      },
      onCompleted: ({ updateBudgetItem: { name } }) => {
        handleSuccess(`${name} Budget Item updated`);
        close();
      },
      onError: handleError,
      refetchQueries: [
        { query: GET_BUDGET_ITEM, variables: { budgetItemId: id } },
        { query: GET_CATEGORY, variables: { categoryId } },
        { query: GET_BUDGET, variables: { budgetId } },
      ],
    });
  };

  const handleSubmit = (formValues: BudgetItemFormValues) => {
    const parsedValues = parseFormValues(formValues);

    if (values) {
      return handleUpdateBudgetItem({ ...parsedValues, id: values.budgetItemId });
    }

    return handleAddBudgetItem({ ...parsedValues, categoryId });
  };

  return (
    <Modal opened={opened} onClose={close} size="md" title={`${operation} Budget Item`}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="xl">
          <TextInput withAsterisk label="Name" placeholder="Target Shopping Trip" {...form.getInputProps("name")} />
          <NumberInput withAsterisk label="Amount" type="number" precision={2} {...form.getInputProps("amount")} />
          <Checkbox
            label="Does this Item have a due date?"
            checked={initialValues.hasDueDate}
            {...form.getInputProps("hasDueDate")}
          />
          {form.values.hasDueDate && (
            <TextInput
              label="Due Date"
              type="date"
              placeholder={new Date().toDateString()}
              {...form.getInputProps("dueDate")}
            />
          )}
          <Checkbox
            label="Have you paid this item off yet?"
            checked={initialValues.paid}
            {...form.getInputProps("paid")}
          />
          {form.values.paid && (
            <TextInput
              label="Paid Date"
              type="date"
              placeholder={new Date().toDateString()}
              {...form.getInputProps("paidDate")}
            />
          )}
          <TextInput
            label="Note"
            placeholder="Things I might need to know about this Target trip...."
            {...form.getInputProps("note")}
          />
          <Button type="submit">{operation}</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default BudgetItemFormModal;
