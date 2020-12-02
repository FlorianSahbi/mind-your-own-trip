import React from "react";
import { CircularProgress, TextField, Button, Typography } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form";
import { UPDATE_USER, GET_USER } from "../GraphQl/users";
import Spacer from "../Layout/Spacer";

interface UpdateUserFormInterface {
  id: string;
}

const UpdateUserForm = ({ id }: UpdateUserFormInterface) => {

  const { register, handleSubmit } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id }
  })

  const [UpdateUser] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser: { firstName } }) => {
      enqueueSnackbar(`${firstName} has been successfully updated`, { variant: "success" });
    }
  })

  const onSubmit = ({firstName, lastName, profilePicture}: any) => UpdateUser({ variables: { id, firstName, lastName, profilePicture } });

  if (error) {
    return <p>Error...</p>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <form
      id="update-user-form"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        border: "1px solid lightGrey",
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
        padding: "15px",
        width: "500px",
      }}
    >
      <Typography variant="h1">Update {data?.getUser.firstName}.</Typography>
      <Spacer
        spacing={20}
        orientation="vertical"
      />
      <TextField
        inputRef={register}
        name="firstName"
        label="First Name"
        variant="outlined"
        defaultValue={data?.getUser.firstName}
      />
      <Spacer
        spacing={15}
        orientation="vertical"
      />
      <TextField
        inputRef={register}
        name="lastName"
        label="Last Name"
        variant="outlined"
        defaultValue={data?.getUser.lastName}
      />
      <Spacer
        spacing={15}
        orientation="vertical"
      />
      <TextField
        inputRef={register}
        name="profilePicture"
        label="Profile Picture"
        variant="outlined"
        defaultValue={data?.getUser.profilePicture}
      />
      <Spacer
        spacing={15}
        orientation="vertical"
      />
      <Button
        type="submit"
        form="update-user-form"
        color="primary"
        autoFocus
      >
        Save
      </Button>
    </form>
  )
}

export default UpdateUserForm;
