import { gql, useMutation } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

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

const CREATE_USER = gql`
  mutation createUser($createUserData: CreateUserInput!) {
    createUser(createUserData: $createUserData) {
      id
      email
    }
  }
`;

export const useCreateUser = () => {
  return useMutation<User, CreateUserInput>(CREATE_USER, {
    errorPolicy: "all",
    onError: (error) => console.error("error: ", error),
  });
};
