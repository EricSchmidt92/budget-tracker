import BudgetForm from "@/components/Budget/BudgetFormModal";
import { Box } from "@mantine/core";

const CreateBudget = () => {
  return (
    <Box maw="30%" mx="auto" mt="xl">
      <BudgetForm />
    </Box>
  );
};

export default CreateBudget;
