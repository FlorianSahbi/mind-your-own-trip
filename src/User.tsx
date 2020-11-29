import { Typography, CircularProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import React from "react";
import CardPlace from "./Card";
import { places } from "./Constants";
import { useSnackbar } from 'notistack';

const GET_USER = gql`
  query  GetUser($id: ID!) {
    getUser(id: $id) {
      _id
      firstName
      lastName
      profilePicure
    }
  }
`;

const DELETE_USER = gql`
  mutation  DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      _id
      firstName
      lastName
      profilePicure
    }
  }
`;

const UPDATE_USER = gql`
  mutation  UpdateUser($id: ID!, $firstName: String) {
    updateUser(id: $id, firstName: $firstName ) {
      _id
      firstName
      lastName
      profilePicure
    }
  }
`;

function User() {
  const { id } = useParams();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id }
  })

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: ({ deleteUser: { firstName } }) => {
      enqueueSnackbar(`${firstName} has been successfully removed`, { variant: "success" });
      history.replace("/users")
    }
  })

  const [UpdateUser] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser: { firstName, lastName, profilePicure } }) => {
      enqueueSnackbar(`${firstName} has been successfully updated`, { variant: "success" });
    }
  })

  if (error) {
    return <p>Error...</p>
  }

  if (loading) {
    return (
      <div style={{
        // border: "3px solid blue",
        width: "100%",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <div style={{
        // border: "3px solid blue",
        width: "100%",
        height: "250px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <Avatar style={{ height: "100px", width: "100px" }} alt="Cindy Baker" src={data.getUser.profilePicure} />
        <Typography variant="h1">
          {data.getUser.firstName}
        </Typography>
        {/* <Typography
          onClick={() => deleteUser({ variables: { id } })}
          variant="h6"
          color="error"
        >
          Delete
        </Typography> */}
        {/* <Typography
          onClick={() => UpdateUser({ variables: { id, firstName: "Florian" } })}
          variant="h6"
          color="primary"
        >
          Edit
        </Typography> */}
      </div>
      <div
        className="App"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(345px, 1fr))",
          gap: "1rem",
          justifyItems: "center",
          padding: "1rem",
        }}
      >
        {places?.filter(({ user: { firstName } }) => firstName === data.getUser.firstName).map(
          ({ name, preview, code, country, user: { profilePicture } }) => (
            <CardPlace
              key={`${name}${preview}`}
              name={name}
              src={preview}
              country={country}
              code={code}
              profilePicture={profilePicture}
            />
          )
        )}
      </div>
    </>
  )
}

export default User;
