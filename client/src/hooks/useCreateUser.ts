import { graphql } from "@/gql";
import { useMutation } from "@apollo/client";

interface CreateUserInput {
  createUserData: {
    email: string;
    password: string;
  };
}

interface User {
  id: string;
  email: string;
}

export const CREATE_USER = graphql(`
  mutation createUser($createUserData: CreateUserInput!) {
    createUser(createUserData: $createUserData) {
      id
      email
    }
  }
`);

export const useCreateUser = () => {
  return useMutation<User, CreateUserInput>(CREATE_USER, {
    errorPolicy: "all",
    onError: (error) => console.error("error: ", error),
  });
};
