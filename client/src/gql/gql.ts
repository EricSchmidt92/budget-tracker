/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(updateCategoryInput: $updateCategoryInput) {\n      name\n      id\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  mutation RemoveCategory($removeCategoryId: String!) {\n    removeCategory(id: $removeCategoryId)\n  }\n": types.RemoveCategoryDocument,
    "\n  query Categories($budgetId: String!) {\n    categories(budgetId: $budgetId) {\n      currentAmount\n      maxAmount\n      name\n      id\n    }\n  }\n": types.CategoriesDocument,
    "\n  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      currentAmount\n      id\n      maxAmount\n      name\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation createUser($createUserData: CreateUserInput!) {\n    createUser(createUserData: $createUserData) {\n      id\n      email\n    }\n  }\n": types.CreateUserDocument,
    "\n  query Me {\n    me {\n      id\n      email\n    }\n  }\n": types.MeDocument,
    "\n  query Budget($budgetId: String!) {\n    budget(id: $budgetId) {\n      currentAmount\n      description\n      id\n      maxAmount\n      name\n      categories {\n        name\n        maxAmount\n        id\n        currentAmount\n        budgetItems {\n          amount\n          dueDate\n          id\n          name\n          note\n          paid\n          paidDate\n        }\n      }\n    }\n  }\n": types.BudgetDocument,
    "\n  mutation CreateBudget($createBudgetInput: CreateBudgetInput!) {\n    createBudget(createBudgetInput: $createBudgetInput) {\n      id\n    }\n  }\n": types.CreateBudgetDocument,
    "\n  query Budgets {\n    budgets {\n      id\n      maxAmount\n      description\n      name\n    }\n  }\n": types.BudgetsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(updateCategoryInput: $updateCategoryInput) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(updateCategoryInput: $updateCategoryInput) {\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCategory($removeCategoryId: String!) {\n    removeCategory(id: $removeCategoryId)\n  }\n"): (typeof documents)["\n  mutation RemoveCategory($removeCategoryId: String!) {\n    removeCategory(id: $removeCategoryId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Categories($budgetId: String!) {\n    categories(budgetId: $budgetId) {\n      currentAmount\n      maxAmount\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  query Categories($budgetId: String!) {\n    categories(budgetId: $budgetId) {\n      currentAmount\n      maxAmount\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      currentAmount\n      id\n      maxAmount\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      currentAmount\n      id\n      maxAmount\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($createUserData: CreateUserInput!) {\n    createUser(createUserData: $createUserData) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserData: CreateUserInput!) {\n    createUser(createUserData: $createUserData) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Budget($budgetId: String!) {\n    budget(id: $budgetId) {\n      currentAmount\n      description\n      id\n      maxAmount\n      name\n      categories {\n        name\n        maxAmount\n        id\n        currentAmount\n        budgetItems {\n          amount\n          dueDate\n          id\n          name\n          note\n          paid\n          paidDate\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Budget($budgetId: String!) {\n    budget(id: $budgetId) {\n      currentAmount\n      description\n      id\n      maxAmount\n      name\n      categories {\n        name\n        maxAmount\n        id\n        currentAmount\n        budgetItems {\n          amount\n          dueDate\n          id\n          name\n          note\n          paid\n          paidDate\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBudget($createBudgetInput: CreateBudgetInput!) {\n    createBudget(createBudgetInput: $createBudgetInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBudget($createBudgetInput: CreateBudgetInput!) {\n    createBudget(createBudgetInput: $createBudgetInput) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Budgets {\n    budgets {\n      id\n      maxAmount\n      description\n      name\n    }\n  }\n"): (typeof documents)["\n  query Budgets {\n    budgets {\n      id\n      maxAmount\n      description\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;