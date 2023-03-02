import BudgetFormModal from "@/components/Budget/BudgetFormModal";
import { graphql } from "@/gql";
import { GET_BUDGETS } from "@/pages/index";
import { useMutation } from "@apollo/client";
import { Box, Button, NumberInput, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import accounting from "accounting";
import { useRouter } from "next/router";

const CreateBudget = () => {
  return (
    <Box maw="30%" mx="auto" mt="xl">
      <BudgetFormModal />
    </Box>
  );
};

export default CreateBudget;
