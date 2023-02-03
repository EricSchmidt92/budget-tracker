import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";

const GET_ME = graphql(`
  query Me {
    me {
      id
      email
    }
  }
`);

const useGetMe = () => {
  return useQuery(GET_ME, {
    errorPolicy: "all",
    onError: (err) => {
      if (err.message === "Unauthorized") {
        return;
      }
      console.error("error: ", err);
    },
  });
};

export default useGetMe;
