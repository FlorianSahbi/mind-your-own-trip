import { gql } from "@apollo/client";

export const GET_PLACES = gql`
  query GetPlaces {
    getPlaces {
      _id
      name
      country
      preview
      code
      addedBy {
        firstName
        profilePicture
      }
      location {
        coordinates
      }
    }
  }
`;

export const CREATE_PLACE = gql`
  mutation CreatePlace(
      $name: String
      $country: String 
      $preview: String 
      $code: String 
      $addedBy: ID! 
      $lng: Float 
      $lat: Float
    ) {
    createPlace(
      name: $name 
      country: $country 
      preview: $preview 
      code: $code 
      addedBy: $addedBy 
      lng: $lng 
      lat: $lat
      ) {
        _id
        name
        country
        preview
        code
        addedBy {
          firstName
          profilePicture
        }
        location {
          coordinates
        }
    }
  }
`;

export const DELETE_PLACE = gql`
  mutation DeletePlace(
      $id: ID!
    ) {
    deletePlace(
      id: $id
      ) {
        _id
        name
        country
        preview
        code
        addedBy {
          firstName
          profilePicture
        }
        location {
          coordinates
        }
    }
  }
`;

export const UPDATE_PLACE = gql`
  mutation UpdatePlace(
      $id: ID!
      $name: String
      $code: String
      $country: String
      $preview: String
    ) {
      updatePlace(
      id: $id
      name: $name
      code: $code
      country: $country
      preview: $preview
      ) {
        _id
        name
        country
        preview
        code
        addedBy {
          firstName
          profilePicture
        }
        location {
          coordinates
        }
    }
  }
`;
