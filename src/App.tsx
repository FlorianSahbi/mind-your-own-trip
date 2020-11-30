import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createContainer } from "unstated-next";
import { SnackbarProvider, useSnackbar } from "notistack";
import { gql, useMutation } from "@apollo/client";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
} from "@material-ui/core";
import Home from "./Home";
import User from "./User";
import Users from "./Users";
import client from "./Client";
import { FLORIAN_ID_DB } from "./Constants";

interface FormInterface {
  firstName: string;
  lastName: string;
  iceCreamType: string;
}

interface DialogContextInterface {
  createPlaceModal: boolean;
}

const CREATE_PLACE = gql`
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
    }
  }
`;

const initialState: DialogContextInterface = {
  createPlaceModal: false,
}

function useDialog(initialState: DialogContextInterface) {
  let [state, setState] = useState<DialogContextInterface>(initialState);
  let openModal = (name: "createPlaceModal") => setState({ ...state, [name]: true });
  let closeModal = (name: "createPlaceModal") => setState({ ...state, [name]: false });
  return { ...state, openModal, closeModal };
}

export let DialogContext = createContainer(useDialog);

export const theme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: "Dancing Script",
      fontSize: "32px",
    },
    h2: {
      fontFamily: "Dosis",
      fontSize: "28px",
    },
    h3: {
      fontFamily: "Dosis",
      fontSize: "24px",
    },
    h4: {
      fontFamily: "Dosis",
      fontSize: "20px",
    },
    h5: {
      fontFamily: "Dosis",
      fontSize: "18px",
    },
    h6: {
      fontFamily: "Dosis",
      fontSize: "16px",
    },
  },
});

function Dialogs() {
  const { createPlaceModal, closeModal } = DialogContext.useContainer();
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [createPlace] = useMutation(CREATE_PLACE, {
    onCompleted: ({ createPlace: { name } }: any) => {
      enqueueSnackbar(`${name} has been successfully added to our list`, { variant: "success" });
      closeModal("createPlaceModal");
    }
  })
  const onSubmit = (data: any) => {
    console.log({ ...data, addedBy: FLORIAN_ID_DB, lng: 2.8954, lat: 42.6976 })
    createPlace({ variables: { ...data, addedBy: FLORIAN_ID_DB, lng: 2.8954, lat: 42.6976 } })
  };

  return (
    <Dialog
      open={createPlaceModal}
      onClose={() => closeModal("createPlaceModal")}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Add a place.
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">

          <form id="add-place-form" onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              id="outlined-basic"
              variant="outlined"
              inputRef={register({ required: true })}
            />
            <span style={{ margin: "10px 0" }} />
            <TextField
              margin="dense"
              name="country"
              label="Country"
              id="outlined-basic"
              variant="outlined"
              inputRef={register({ required: true })}
            />
            <span style={{ margin: "10px 0" }} />
            <TextField
              margin="dense"
              name="preview"
              label="Preview"
              id="outlined-basic"
              variant="outlined"
              inputRef={register({ required: true })}
            />
            <span style={{ margin: "10px 0" }} />
            <TextField
              margin="dense"
              name="code"
              label="Code"
              id="outlined-basic"
              variant="outlined"
              inputRef={register({ required: true })}
            />
          </form>


        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModal("createPlaceModal")} color="primary">
          Disagree
      </Button>
        <Button
          type="submit"
          form="add-place-form"
          // onClick={() => closeModal("createPlaceModal")}
          color="primary"
          autoFocus
        >
          Agree
      </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          hideIconVariant
        >
          <DialogContext.Provider initialState={initialState}>
            <Router>
              <Switch>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/user/:id">
                  <User />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Router>
            <Dialogs />
          </DialogContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
