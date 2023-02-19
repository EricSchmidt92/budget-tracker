import { RemoveCategoryMutationVariables, CreateBudgetItemInput } from "@/gql/graphql";
import { ActionIcon, Menu } from "@mantine/core";
import { Dots, Edit, Plus, Trash } from "tabler-icons-react";

import { MenuAction, MenuItemSelectProps } from "./types";

interface CategoryMenuProps {
  onItemSelect: (props: MenuItemSelectProps) => void;
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
          onClick={() => console.log("add item selected....to be implemented")}
        >
          Add Budget Item
        </Menu.Item>

        <Menu.Item
          icon={<Edit size={18} strokeWidth={1.5} />}
          color="yellow.4"
          onClick={() => console.log("edit category selected...to be implemented.....")}
        >
          Edit Category
        </Menu.Item>

        <Menu.Item
          icon={<Trash size={18} strokeWidth={1.5} />}
          color="red"
          onClick={() => onItemSelect({ action: MenuAction.DELETE_CATEGORY })}
        >
          Delete Category
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default CategoryMenu;
