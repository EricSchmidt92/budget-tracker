import { BudgetQuery, BudgetQueryVariables } from "@/gql/graphql";
import { graphql } from "msw";

export const budget: BudgetQuery["budget"] = {
  categories: [],
  currentAmount: "$0.00",
  maxAmount: "$100.00",
  name: "Monthly Utilities",
  id: "budgetId1",
  description: "The description for the budget",
};

export const budgetHandler = graphql.query<BudgetQuery, BudgetQueryVariables>("Budget", (req, res, ctx) =>
  res(
    ctx.data({
      budget,
    })
  )
);
