import { graphql } from "@/gql";
import { GET_BUDGETS } from "@/pages";
import { useMutation } from "@apollo/client";
import { TextInput, NumberInput, Textarea, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import accounting from "accounting";
import { useRouter } from "next/router";
import React from "react";

interface BudgetFormValues {
  name: string;
  maxAmount: number;
  description?: string;
}

interface BudgetFormProps {
  values?: {
    budgetId: string;
    initialValues: BudgetFormValues;
  };
}

interface UpdateBudgetProps {
  formValues: BudgetFormValues;
  budgetId: string;
}

export const CREATE_BUDGET = graphql(`
  mutation CreateBudget($createBudgetInput: CreateBudgetInput!) {
    createBudget(createBudgetInput: $createBudgetInput) {
      id
    }
  }
`);

const UPDATE_BUDGET = graphql(`
  mutation UpdateBudget($updateBudgetInput: UpdateBudgetInput!) {
    updateBudget(updateBudgetInput: $updateBudgetInput) {
      id
      name
    }
  }
`);

const BudgetForm = ({ values }: BudgetFormProps) => {
  const [updateBudget] = useMutation(UPDATE_BUDGET);
  const [createBudget] = useMutation(CREATE_BUDGET);
  const router = useRouter();
  const operation = values ? "Update" : "Create";
  const initialValues = values
    ? values.initialValues
    : {
        name: "",
        maxAmount: 0,
        description: "",
      };

  const form = useForm<BudgetFormValues>({
    initialValues,
    validate: {
      name: (value) => (value !== "" ? null : "Please enter a name"),
      maxAmount: (value) => {
        if (value === undefined) {
          return "Please enter a max amount";
        }
        if (value < 0) {
          return "No negative numbers allowed for max amount";
        }
      },
    },
  });

  const handleUpdateBudget = async ({ formValues: { maxAmount, ...formVals }, budgetId }: UpdateBudgetProps) => {
    const parsedMaxAmount = accounting.formatMoney(maxAmount);
    try {
      await updateBudget({
        variables: {
          updateBudgetInput: {
            ...formVals,
            id: budgetId,
            maxAmount: parsedMaxAmount,
          },
        },
        onCompleted: ({ updateBudget: { id } }) => router.push(`/budget/${id}`),
        onError: ({ name, message }) => {
          showNotification({
            title: `Error: ${name}`,
            message,
            color: "red",
          });
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        showNotification({
          title: `ERROR: ${error.name}`,
          message: error.message,
          color: "red",
        });
      }
    }
  };

  const handleAddBudget = async (formValues: BudgetFormValues) => {
    try {
      const maxAmount = accounting.formatMoney(formValues.maxAmount);
      await createBudget({
        variables: {
          createBudgetInput: {
            ...formValues,
            maxAmount,
          },
        },
        refetchQueries: [{ query: GET_BUDGETS }],
        onError: (error) =>
          showNotification({
            title: `ERROR: ${error.name}`,
            message: error.message,
            color: "red",
          }),
        onCompleted: (data) => {
          form.reset();
          if (data) {
            router.push(`/budget/${data.createBudget.id}`);
          } else {
            router.push("/");
          }
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        showNotification({
          title: `ERROR: ${error.name}`,
          message: error.message,
          color: "red",
        });
      }
    }
  };

  const handleSubmit = (formValues: BudgetFormValues) => {
    if (values) {
      return handleUpdateBudget({ formValues, budgetId: values.budgetId });
    }

    return handleAddBudget(formValues);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack spacing={10}>
        <TextInput withAsterisk label="Name" placeholder="Utilities" {...form.getInputProps("name")} />
        <NumberInput
          withAsterisk
          label="Budget Limit"
          placeholder="500"
          type="number"
          precision={2}
          {...form.getInputProps("maxAmount")}
        />
        <Textarea label="Description" placeholder="Electric, water, and sewer" {...form.getInputProps("description")} />
        <Button fullWidth mt="xl" type="submit">
          {operation} Budget
        </Button>
      </Stack>
    </form>
  );
};

export default BudgetForm;
