import BudgetForm from "@/components/Budget/BudgetFormModal";
import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";
import { Box, Title } from "@mantine/core";
import accounting from "accounting";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const GET_BUDGET_FOR_UPDATE_FORM = graphql(`
  query BudgetForUpdateForm($budgetId: String!) {
    budget(id: $budgetId) {
      id
      maxAmount
      description
      name
    }
  }
`);

const EditBudgetPage: NextPage = () => {
  const { query } = useRouter();
  const budgetId = query.id as string;
  const { data, error, loading } = useQuery(GET_BUDGET_FOR_UPDATE_FORM, {
    variables: {
      budgetId,
    },
  });

  if (error) {
    return (
      <Title>
        {error.name} - {error.message}
      </Title>
    );
  }

  if (loading || !data) {
    return <Title>Loading</Title>;
  }

  const {
    budget: { id, maxAmount, description, name },
  } = data;

  const parsedMaxAmount = accounting.unformat(maxAmount);

  return (
    <Box maw="30%" mx="auto" mt="xl">
      <BudgetForm
        values={{
          budgetId: id,
          initialValues: { maxAmount: parsedMaxAmount, name, description: description ? description : undefined },
        }}
      />
    </Box>
  );
};

export default EditBudgetPage;
