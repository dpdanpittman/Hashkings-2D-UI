import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

export const MESSAGES_FRAGMENT = gql`
  fragment MessageInfo on comments {
    id
    permlink
    author {
      name
      profile_image
    }
    created_at
    body
    children
    __typename
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      name
      profile_image
    }
  }
`;

// hard coded post for now, in the future will
// have channels stemming from multiple posts

export const LATEST_MESSAGES_QUERY = gql`
  query messages {
    messages: comments(
      order_by: { id: desc }
      where: { parent_id: { _eq: 69353917 } }
    ) {
      ...MessageInfo
    }
  }
  ${MESSAGES_FRAGMENT}
`;

// Query to load messages created after a given ID.
// Will be triggered on subscription update

export const MORE_MESSAGES_QUERY = gql`
  query moreMessages($after: Int!) {
    comments(
      order_by: { id: asc }
      where: {
        _and: [{ parent_id: { _eq: 69353917 } }, { id: { _gt: $after } }]
      }
    ) {
      ...MessageInfo
    }
  }
  ${MESSAGES_FRAGMENT}
`;

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