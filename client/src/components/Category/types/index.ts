import { Category, CreateBudgetItemInput, UpdateCategoryInput } from "@/gql/graphql";

export interface CategoryProps {
  category: Category;
  budgetId: string;
}

export enum MenuAction {
  ADD_ITEM = "Add Item",
  EDIT_CATEGORY = "Edit Category",
  DELETE_CATEGORY = "Delete Category",
}

interface DeleteCategoryProps {
  action: MenuAction.DELETE_CATEGORY;
}

interface AddItemProps {
  action: MenuAction.ADD_ITEM;
  variables: CreateBudgetItemInput;
}

interface EditCategoryProps {
  action: MenuAction.EDIT_CATEGORY;
  variables: UpdateCategoryInput;
}

export type MenuItemSelectProps = AddItemProps | EditCategoryProps | DeleteCategoryProps;
