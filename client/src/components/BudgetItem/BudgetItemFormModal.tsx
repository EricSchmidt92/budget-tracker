import { Button, Checkbox, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface BudgetItemFormValues {
  name: string;
  amount: number;
  dueDate: string;
  paidDate: string;
  paid: boolean;
  note?: string;
}

interface BudgetItemFormProps {
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

const BudgetItemFormModal = ({ opened, close, values }: BudgetItemFormProps) => {
  const operation = values !== undefined ? "Update" : "Create";
  const initialValues = values
    ? values.initialValues
    : {
        name: "",
        amount: 0,
        dueDate: new Date().toISOString().slice(0, 10),
        paidDate: new Date().toISOString().slice(0, 10),
        paid: false,
        note: "",
      };

  const form = useForm<BudgetItemFormValues>({
    initialValues: {
      note: "",
      ...initialValues,
    },
  });

  const handleSubmit = (formValues: BudgetItemFormValues) => {
    console.log("Submitted the form with values: ");
    console.table(formValues);
  };

  const handleOnClose = () => {
    form.reset();
    close();
  };

  return (
    <Modal opened={opened} onClose={handleOnClose} size="md" title={`${operation} Budget Item`}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="xl">
          <TextInput withAsterisk label="Name" placeholder="Target" {...form.getInputProps("name")} />
          <NumberInput withAsterisk label="Amount" type="number" {...form.getInputProps("amount")} />
          <TextInput
            withAsterisk
            label="Due Date"
            type="date"
            placeholder={new Date().toDateString()}
            {...form.getInputProps("dueDate")}
          />
          <TextInput
            withAsterisk
            label="Paid Date"
            type="date"
            placeholder={new Date().toDateString()}
            {...form.getInputProps("paidDate")}
          />
          <Checkbox label="Paid?" {...form.getInputProps("paid")} />
          <TextInput
            label="Note"
            placeholder="Things I might need to know about this trip...."
            {...form.getInputProps("note")}
          />
          <Button type="submit">{operation}</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default BudgetItemFormModal;
