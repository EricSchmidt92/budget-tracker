import { BudgetsQuery, BudgetsQueryVariables, MeQuery, MeQueryVariables } from "@/gql/graphql";
import { graphql } from "msw";

export const budgets: BudgetsQuery["budgets"] = [
  {
    id: "1",
    maxAmount: "$1000",
    name: "Unique First Budget",
    description: "The 1st budget description",
  },
  {
    id: "2",
    maxAmount: "$2000",
    name: "Unique Second Budget",
    description: "The 2nd budget description",
  },
];

export const handlers = [
  graphql.query<MeQuery, MeQueryVariables>("Me", (_req, res, ctx) => {
    return res(
      ctx.data({
        me: {
          id: "1",
          email: "fake@mail.comx",
          __typename: "User",
        },
      })
    );
  }),

  graphql.query<BudgetsQuery, BudgetsQueryVariables>("Budgets", (req, res, ctx) =>
    res(
      ctx.data({
        budgets,
      })
    )
  ),
];
