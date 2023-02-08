import { CategoriesQuery } from "@/gql/graphql";

export type Category = CategoriesQuery["categories"][number];
