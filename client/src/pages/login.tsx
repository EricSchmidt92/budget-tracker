import { LoginRequest, useLogin } from "@/hooks/useLogin";
import { Anchor, Box, Button, Center, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

const Login = () => {
  const { login } = useLogin();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginRequest) => {
    await login(values);
    router.push("/");
  };

  return (
    <Center mx="auto" h="70%">
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
            Login
          </Button>
          <Anchor component="button" onClick={() => router.push("/signup")}>
            New? Sign Up here
          </Anchor>
        </Box>
      </form>
    </Center>
  );
};

export default Login;
