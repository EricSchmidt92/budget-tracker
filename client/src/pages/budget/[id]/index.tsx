import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";
import { Title, useMantineTheme } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";

const GET_BUDGET = graphql(`
  query Budget($budgetId: String!) {
    budget(id: $budgetId) {
      name
      description
      maxAmount
      budgetItems {
        name
        note
      }
    }
  }
`);

`
budget() {
  name
  description
  categories {
    name
    budgeItems {

    }
  }
}
`;

const BudgetPage: NextPage = () => {
  const { query } = useRouter();
  const budgetId = query.id as string;
  const { primaryColor } = useMantineTheme();
  const { data: { budget } = {} } = useQuery(GET_BUDGET, {
    variables: {
      budgetId,
    },
  });

  return (
    <Title color={primaryColor} order={1}>
      budget with a name of {budget?.name}
    </Title>
  );
};

export default BudgetPage;
