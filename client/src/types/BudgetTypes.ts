import { BudgetsQuery } from "@/gql/graphql";

export type Budget = BudgetsQuery["budgets"][number];
