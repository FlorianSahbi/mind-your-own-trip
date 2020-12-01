import { Typography, CircularProgress, TextField, Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import React from "react";
import CardPlace from "./Card";
import { places } from "./Constants";
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form";

const GET_USER = gql`
  query  GetUser($id: ID!) {
    getUser(id: $id) {
      _id
      firstName
      lastName
      profilePicture
    }
  }
`;

const DELETE_USER = gql`
  mutation  DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      _id
      firstName
      lastName
      profilePicture
    }
  }
`;

const UPDATE_USER = gql`
  mutation  UpdateUser($id: ID!, $profilePicture: String, $firstName: String) {
    updateUser(id: $id, profilePicture: $profilePicture, firstName: $firstName ) {
      _id
      firstName
      lastName
      profilePicture
    }
  }
`;

const PreviewForm = ({ defaultValue }: any) => {
  // @ts-ignore
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const [UpdateUser] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser: { firstName, lastName, profilePicture } }) => {
      enqueueSnackbar(`${firstName} has been successfully updated`, { variant: "success" });
    }
  })

  const onSubmit = (data: any) => {
    console.log(data)
    UpdateUser({ variables: { id, profilePicture: data.profilePicture, firstName: data.firstName } })
  }

  return (
    <form id="add-place-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        inputRef={register}
        name="profilePicture"
        label="profilePicture"
        variant="outlined"
        defaultValue={defaultValue}
      />
      <TextField
        inputRef={register}
        name="firstName"
        label="firstName"
        variant="outlined"
        defaultValue={defaultValue}
      />
      <Button
        type="submit"
        form="add-place-form"
        color="primary"
        autoFocus
      />
    </form>
  )
}

function User() {
  // @ts-ignore
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
        <Avatar style={{ height: "100px", width: "100px" }} alt="Cindy Baker" src={data.getUser.profilePicture} />
        <Typography variant="h1">
          {data.getUser.firstName}
          <PreviewForm defaultValue={data.getUser.profilePicture} />
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
      {/* <div
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
          ({ _id, name, preview, code, country, user: { profilePicture } }) => (
            <CardPlace
              key={_id}
              id={_id}
              name={name}
              src={preview}
              country={country}
              code={code}
              profilePicture={profilePicture}
            />
          )
        )}
      </div> */}
    </>
  )
}

export default User;
