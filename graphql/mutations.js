import gql from "graphql-tag";

export const VERIFY_LOGIN_MUTATION = gql`
  mutation verifyLogin($username: String!) {
    verifyLogin(username: $username)
  }
`;