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

export const CREATE_BUDGET = graphql(`
  mutation CreateBudget($createBudgetInput: CreateBudgetInput!) {
    createBudget(createBudgetInput: $createBudgetInput) {
      id
    }
  }
`);

const BudgetFormModal = () => {
  const [createBudget] = useMutation(CREATE_BUDGET);
  const router = useRouter();
  const form = useForm<BudgetFormValues>({
    initialValues: {
      name: "",
      description: "",
      maxAmount: 0,
    },
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

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const maxAmount = accounting.formatMoney(values.maxAmount);
      await createBudget({
        variables: {
          createBudgetInput: {
            ...values,
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
          Create Budget
        </Button>
      </Stack>
    </form>
  );
};

export default BudgetFormModal;
