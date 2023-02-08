import {
  CategoriesQuery,
  CategoriesQueryVariables,
  Category,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  MeQuery,
  MeQueryVariables,
  RemoveCategoryMutation,
  RemoveCategoryMutationVariables,
} from "@/gql/graphql";
import { graphql } from "msw";

const initialCategories: Category[] = [
  {
    id: "category-1",
    name: "electric",
    __typename: "Category",
  },
  {
    id: "category-2",
    name: "Food",
    __typename: "Category",
  },
];

export let categories: Category[] = initialCategories;

export const resetCategories = () => (categories = initialCategories);

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

  graphql.query<CategoriesQuery, CategoriesQueryVariables>(
    "Categories",
    (_req, res, ctx) => {
      return res(
        ctx.data({
          categories,
        })
      );
    }
  ),

  graphql.mutation<RemoveCategoryMutation, RemoveCategoryMutationVariables>(
    "RemoveCategory",
    (req, res, ctx) => {
      const { removeCategoryId } = req.variables;
      categories = categories.filter(({ id }) => id !== removeCategoryId);

      return res(
        ctx.data({
          __typename: "Mutation",
          removeCategory: true,
        })
      );
    }
  ),

  graphql.mutation<CreateCategoryMutation, CreateCategoryMutationVariables>(
    "CreateCategory",
    (req, res, ctx) => {
      const {
        createCategoryInput: { name },
      } = req.variables;
      const newCategory: Category = {
        __typename: "Category",
        id: "category-3",
        name,
      };
      categories.push(newCategory);
      console.log("new categories for push: ", categories);

      return res(
        ctx.data({ __typename: "Mutation", createCategory: { name } })
      );
    }
  ),
];
