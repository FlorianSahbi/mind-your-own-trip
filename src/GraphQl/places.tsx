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
        profilePicure
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
        profilePicure
      }
      location {
        coordinates
      }
    }
  }
`;
