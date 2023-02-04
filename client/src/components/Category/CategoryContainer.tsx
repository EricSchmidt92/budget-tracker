import { Stack } from "@mantine/core";
import CategoryListItem from "./CategoryListItem";
import { Category } from "./types/types";

interface ContainerProps {
  categories: Category[];
}

const CategoryContainer = ({ categories }: ContainerProps) => {
  return (
    <Stack align="start" w="100%">
      {categories &&
        categories.map((category) => (
          <CategoryListItem key={category.id} category={category} />
        ))}
    </Stack>
  );
};

export default CategoryContainer;
