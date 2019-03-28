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