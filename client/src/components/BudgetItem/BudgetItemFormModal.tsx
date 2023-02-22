import { graphql } from "@/gql";
import { CreateBudgetItemInput } from "@/gql/graphql";
import { GET_BUDGET } from "@/pages/budget/[id]";
import { ApolloError, useMutation } from "@apollo/client";
import { Button, Checkbox, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import accounting from "accounting";

interface BudgetItemFormValues {
  name: string;
  amount: number;
  hasDueDate: boolean;
  dueDate?: string;
  paidDate?: string;
  paid: boolean;
  note?: string;
}

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

interface UpdateBudgetItemProps {
  formValues: BudgetItemFormValues;
  budgetItemId: string;
}

const CREATE_BUDGET_ITEM = graphql(`
  mutation CreateBudgetItem($createBudgetItemInput: CreateBudgetItemInput!) {
    createBudgetItem(createBudgetItemInput: $createBudgetItemInput) {
      id
      name
    }
  }
`);

const BudgetItemFormModal = ({ opened, close, values, categoryId, budgetId }: BudgetItemFormProps) => {
  const [createBudgetItem] = useMutation(CREATE_BUDGET_ITEM);
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
      note: "",
      dueDate: new Date().toISOString().slice(0, 10),
      paidDate: new Date().toISOString().slice(0, 10),
      ...initialValues,
    },
  });

  const handleOnClose = () => {
    form.reset();
    close();
  };

  const handleSuccess = (message: string) => {
    showNotification({
      title: "Success",
      message,
    });

    handleOnClose();
  };

  const handleError = (error: ApolloError) => {
    showNotification({
      title: error.name,
      message: error.message,
      color: "red",
    });
  };

  const handleAddBudgetItem = async (values: CreateBudgetItemInput) => {
    await createBudgetItem({
      variables: {
        createBudgetItemInput: {
          ...values,
        },
      },
      onCompleted: ({ createBudgetItem: { name } }) => {
        handleSuccess(`${name} Budget item created`);
      },
      onError: handleError,
      refetchQueries: [{ query: GET_BUDGET, variables: { budgetId } }],
    });
  };

  const parseFormValues = (formValues: BudgetItemFormValues): CreateBudgetItemInput => {
    const { paid, hasDueDate, paidDate, dueDate, amount, ...values } = formValues;
    return {
      paid,
      paidDate: paid ? paidDate : null,
      dueDate: hasDueDate ? dueDate : null,
      amount: accounting.formatMoney(amount) as "USCurrency",
      categoryId,
      ...values,
    };
  };

  const handleSubmit = (formValues: BudgetItemFormValues) => {
    console.log("Submitted the form with values: ");
    console.table(formValues);
    const parsedValues = parseFormValues(formValues);
    console.table(parsedValues);

    if (values) {
      console.log("attempting to update a budget item...implement me!");
    }

    handleAddBudgetItem(parsedValues);
  };

  return (
    <Modal opened={opened} onClose={handleOnClose} size="md" title={`${operation} Budget Item`}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="xl">
          <TextInput withAsterisk label="Name" placeholder="Target Shopping Trip" {...form.getInputProps("name")} />
          <NumberInput withAsterisk label="Amount" type="number" {...form.getInputProps("amount")} />
          <Checkbox label="Does this Item have a due date?" {...form.getInputProps("hasDueDate")} />
          {form.values.hasDueDate && (
            <TextInput
              label="Due Date"
              type="date"
              placeholder={new Date().toDateString()}
              {...form.getInputProps("dueDate")}
            />
          )}
          <Checkbox label="Have you paid this item off yet?" {...form.getInputProps("paid")} />
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
