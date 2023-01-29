import { gql, useQuery } from "@apollo/client";

const GET_ME = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

const useGetMe = () => {
  return useQuery(GET_ME, {
    errorPolicy: "all",
    onError: (err) => {
      console.error("error: ", err);
    },
  });
};

export default useGetMe;
