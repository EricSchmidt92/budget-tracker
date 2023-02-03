import { useCreateUser } from "@/hooks/useCreateUser";
import { LoginRequest, useLogin } from "@/hooks/useLogin";
import { Anchor, Box, Button, Center, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

const Signup = () => {
  const [createUser] = useCreateUser();
  const { login } = useLogin();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginRequest) => {
    await createUser({
      variables: {
        createUserData: values,
      },
    });

    await login(values);
    router.push("/");
  };

  return (
    <Center mx="auto" h="70%" miw={40}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Box w="270px">
          <TextInput
            withAsterisk
            label="Email"
            placeholder="fake@fake.comx"
            {...form.getInputProps("email")}
          />

          <TextInput
            mt="sm"
            withAsterisk
            label="Password"
            type="password"
            placeholder="*****"
            {...form.getInputProps("password")}
          />

          <Button my="md" type="submit" fullWidth>
            Sign Up
          </Button>
          <Anchor component="button" onClick={() => router.push("/login")}>
            Already have an account? Login here
          </Anchor>
        </Box>
      </form>
    </Center>
  );
};

export default Signup;
