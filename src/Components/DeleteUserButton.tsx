import React from "react";
import { Typography } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { DELETE_USER } from "../GraphQl/users";

interface DeleteUserInterface {
  id: string;
  label?: string;
}

const DeleteUserButton = ({ id, label = "Delete user" }: DeleteUserInterface) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: ({ deleteUser: { firstName } }) => {
      enqueueSnackbar(`${firstName} has been successfully removed`, { variant: "success" });
      history.replace("/users")
    }
  })

  return (
    <Typography
      onClick={() => deleteUser({ variables: { id } })}
      variant="h6"
      color="error"
    >
      {label}
    </Typography>
  )
}

export default DeleteUserButton;
