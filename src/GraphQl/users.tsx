import { gql } from "@apollo/client";

export const GET_USER = gql`
  query  GetUser($id: ID!) {
    getUser(id: $id) {
      _id
      firstName
      lastName
      profilePicture
    }
  }
`;

export const DELETE_USER = gql`
  mutation  DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      _id
      firstName
      lastName
      profilePicture
    }
  }
`;

export const UPDATE_USER = gql`
  mutation  UpdateUser($id: ID!, $profilePicture: String, $firstName: String, $lastName: String) {
    updateUser(id: $id, profilePicture: $profilePicture, firstName: $firstName, lastName: $lastName  ) {
      _id
      firstName
      lastName
      profilePicture
    }
  }
`;


export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      firstName
      lastName
      profilePicture
    }
  }
`;
