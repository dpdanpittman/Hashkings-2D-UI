import { useQuery } from "react-apollo-hooks";
import { ME_QUERY } from "../graphql/queries";

// Mutation that fetches info about the logged in user based on jwt

function useMe() {
  const { data, refetch } = useQuery(ME_QUERY);
  if (data && data.me) {
    return {
      me: data.me,
      refetchMe: refetch,
    };
  }
  return { me: null, refetchMe: refetch };
}
export default useMe;