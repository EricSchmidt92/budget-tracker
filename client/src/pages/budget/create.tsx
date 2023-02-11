import { graphql } from "@/gql";
import { useMutation } from "@apollo/client";
import { Box, Button, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { GET_BUDGETS } from "@/pages/index";

export const CREATE_BUDGET = graphql(`
  mutation CreateBudget($createBudgetInput: CreateBudgetInput!) {
    createBudget(createBudgetInput: $createBudgetInput) {
      id
    }
  }
`);

const CreateBudget = () => {
  const [createBudget] = useMutation(CREATE_BUDGET);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      maxAmount: "",
    },
    validate: {
      name: (value) => (value !== "" ? null : "Please enter a name"),
      maxAmount: (value) => (value !== "" ? null : "Please enter a max amount"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await createBudget({
        variables: {
          createBudgetInput: {
            ...values,
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
    } catch (error) {}
  };
  return (
    <Box maw="30%" mx="auto" mt="xl">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack spacing={10}>
          <TextInput withAsterisk label="Name" placeholder="Utilities" {...form.getInputProps("name")} />
          <TextInput
            withAsterisk
            label="Budget Limit"
            placeholder="500"
            type="number"
            {...form.getInputProps("maxAmount")}
          />
          <Textarea
            label="Description"
            placeholder="Electric, water, and sewer"
            {...form.getInputProps("description")}
          />
          <Button fullWidth mt="xl" type="submit">
            Create Budget
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateBudget;
