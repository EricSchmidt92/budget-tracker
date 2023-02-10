/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** A currency string, such as $21.25 */
  USCurrency: any;
};

export type Budget = {
  __typename?: 'Budget';
  budgetItems: Array<BudgetItem>;
  /** The sum of all the budget item amounts */
  currentAmount: Scalars['USCurrency'];
  /** An optional description for the budget */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The budget's max amount. This is the monetary amount to stay within for a budget */
  maxAmount: Scalars['USCurrency'];
  /** The name of the budget */
  name: Scalars['String'];
};

export type BudgetItem = {
  __typename?: 'BudgetItem';
  /** The amount of the budget item in pennies */
  amount: Scalars['USCurrency'];
  createdAt: Scalars['DateTime'];
  /** Optional due date for a budget item. Due date and paid date are useful for things such as a utility bill */
  dueDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Name for the budget item (e.g. "Target run")  */
  name: Scalars['String'];
  /** Optional additional information for a budget item */
  note?: Maybe<Scalars['String']>;
  /** If an item has been paid or not */
  paid: Scalars['Boolean'];
  /** Optional date for when a budget item is paid. */
  paidDate?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  /** The name of the category */
  name: Scalars['String'];
};

export type CreateBudgetInput = {
  /** The amount for the budget, so you know when you overspend */
  amount: Scalars['USCurrency'];
  /** An optional description for the budget */
  description?: InputMaybe<Scalars['String']>;
  /** The budget name: e.g. "February Bills" */
  name: Scalars['String'];
};

export type CreateBudgetItemInput = {
  amount: Scalars['USCurrency'];
  budgetId: Scalars['String'];
  categoryId?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  paid: Scalars['Boolean'];
  paidDate?: InputMaybe<Scalars['DateTime']>;
};

export type CreateCategoryInput = {
  /** The name of the budget item category */
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBudget: Budget;
  createBudgetItem: BudgetItem;
  createCategory: Category;
  createUser: User;
  removeBudget: Budget;
  removeBudgetItem: BudgetItem;
  removeCategory: Scalars['Boolean'];
  updateBudget: Budget;
  updateBudgetItem: BudgetItem;
  updateCategory: Category;
};


export type MutationCreateBudgetArgs = {
  createBudgetInput: CreateBudgetInput;
};


export type MutationCreateBudgetItemArgs = {
  createBudgetItemInput: CreateBudgetItemInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateUserArgs = {
  createUserData: CreateUserInput;
};


export type MutationRemoveBudgetArgs = {
  id: Scalars['String'];
};


export type MutationRemoveBudgetItemArgs = {
  id: Scalars['String'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['String'];
};


export type MutationUpdateBudgetArgs = {
  updateBudgetInput: UpdateBudgetInput;
};


export type MutationUpdateBudgetItemArgs = {
  updateBudgetItemInput: UpdateBudgetItemInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};

export type Query = {
  __typename?: 'Query';
  budget: Budget;
  budgetItem: BudgetItem;
  budgetItems: Array<BudgetItem>;
  budgets: Array<Budget>;
  categories: Array<Category>;
  category: Category;
  me: User;
};


export type QueryBudgetArgs = {
  id: Scalars['String'];
};


export type QueryBudgetItemArgs = {
  id: Scalars['String'];
};


export type QueryBudgetItemsArgs = {
  budgetId: Scalars['String'];
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};

export type UpdateBudgetInput = {
  /** The amount for the budget, so you know when you overspend */
  amount?: InputMaybe<Scalars['USCurrency']>;
  /** An optional description for the budget */
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  /** The budget name: e.g. "February Bills" */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateBudgetItemInput = {
  amount?: InputMaybe<Scalars['USCurrency']>;
  budgetId?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  paidDate?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateCategoryInput = {
  id: Scalars['ID'];
  /** The name of the budget item category */
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
};

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryInput: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', name: string, id: string } };

export type RemoveCategoryMutationVariables = Exact<{
  removeCategoryId: Scalars['String'];
}>;


export type RemoveCategoryMutation = { __typename?: 'Mutation', removeCategory: boolean };

export type CreateUserMutationVariables = Exact<{
  createUserData: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string } };

export type BudgetQueryVariables = Exact<{
  budgetId: Scalars['String'];
}>;


export type BudgetQuery = { __typename?: 'Query', budget: { __typename?: 'Budget', name: string, description?: string | null, maxAmount: any, budgetItems: Array<{ __typename?: 'BudgetItem', name: string, note?: string | null }> } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', name: string, id: string }> };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', name: string } };

export type BudgetsQueryVariables = Exact<{ [key: string]: never; }>;


export type BudgetsQuery = { __typename?: 'Query', budgets: Array<{ __typename?: 'Budget', id: string, maxAmount: any, description?: string | null, name: string }> };


export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const RemoveCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeCategoryId"}}}]}]}}]} as unknown as DocumentNode<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const BudgetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Budget"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budgetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"budget"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budgetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"budgetItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]} as unknown as DocumentNode<BudgetQuery, BudgetQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const BudgetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Budgets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"budgets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<BudgetsQuery, BudgetsQueryVariables>;