import { RemoveCategoryMutationVariables, CreateBudgetItemInput } from "@/gql/graphql";
import { ActionIcon, Menu } from "@mantine/core";
import { Dots, Edit, Plus, Trash } from "tabler-icons-react";
import { MenuAction } from "./Category";

interface CategoryMenuProps {
  onItemSelect: (props: MenuAction) => void;
}

const CategoryMenu = ({ onItemSelect }: CategoryMenuProps) => {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon size="lg">
          <Dots strokeWidth={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<Plus size={18} strokeWidth={1.5} />}
          color="green"
          onClick={() => onItemSelect(MenuAction.ADD_ITEM)}
        >
          Add Budget Item
        </Menu.Item>

        <Menu.Item
          icon={<Edit size={18} strokeWidth={1.5} />}
          color="yellow.4"
          onClick={() => onItemSelect(MenuAction.EDIT_CATEGORY)}
        >
          Edit Category
        </Menu.Item>

        <Menu.Item
          icon={<Trash size={18} strokeWidth={1.5} />}
          color="red"
          onClick={() => onItemSelect(MenuAction.DELETE_CATEGORY)}
        >
          Delete Category
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default CategoryMenu;
