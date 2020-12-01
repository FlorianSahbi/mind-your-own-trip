import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createContainer } from "unstated-next";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useMutation, gql, useQuery } from "@apollo/client";
import { CREATE_PLACE, UPDATE_PLACE } from "./GraphQl/places";
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
import { GET_USERS } from "./GraphQl/users";

interface FormInterface {
  firstName: string;
  lastName: string;
  iceCreamType: string;
}

interface DialogContextInterface {
  createPlaceModal: boolean;
  editPlaceModal: boolean;
  placeData: any;
}

const initialState: DialogContextInterface = {
  createPlaceModal: false,
  editPlaceModal: false,
  placeData: null,
}

interface UserInterface {
  firstName: string
  lastName?: string
  profilePicture: string
  __typename: "User"
  _id: string
}

function useAuth() {
  const [activeUser, setActiveUser] = useState<UserInterface | null>(null);
  return {
    activeUser,
    setActiveUser
  }
}

function useDialog(initialState: DialogContextInterface) {
  const [state, setState] = useState<DialogContextInterface>(initialState);
  const openModal = (name: "createPlaceModal" | "editPlaceModal") => setState({ ...state, [name]: true });
  const closeModal = (name: "createPlaceModal" | "editPlaceModal") => setState({ ...state, [name]: false });
  const setPlaceData = (placeData: any) => setState({ ...state, placeData, editPlaceModal: true });
  return { ...state, openModal, closeModal, setPlaceData };
}

//@ts-ignore
export const DialogContext = createContainer(useDialog);
//@ts-ignore
export const AuthContext = createContainer(useAuth);

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
  const { createPlaceModal, editPlaceModal, placeData, closeModal } = DialogContext.useContainer();
  const { activeUser } = AuthContext.useContainer();
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [createPlace] = useMutation(CREATE_PLACE, {
    update: (cache, { data: { createPlace } }) => {
      cache.modify({
        fields: {
          getPlaces(existingPlaces = []) {
            const newPlaceRef = cache.writeFragment({
              data: createPlace,
              fragment: gql`
                fragment NewPlace on Place {
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
              `
            });
            return [newPlaceRef, ...existingPlaces];
          }
        }
      });
    },
    onCompleted: ({ createPlace: { name } }: any) => {
      enqueueSnackbar(`${name} has been successfully added to our list`, { variant: "success" });
      closeModal("createPlaceModal");
    }
  })
  const [updatePlace] = useMutation(UPDATE_PLACE, {
    onCompleted: ({ updatePlace }: any) => {
      console.log(updatePlace)
      enqueueSnackbar(`${updatePlace.name} has been successfully updated`, { variant: "success" });
      closeModal("editPlaceModal");
    }
  })
  const onSubmit = (data: any) => {
    //@ts-ignore
    createPlace({ variables: { ...data, lng: parseFloat(data.lng), lat: parseFloat(data.lat), addedBy: activeUser?._id } })
  };

  const onUpdate = (data: any) => {
    console.log(data)
    //@ts-ignore
    updatePlace({ variables: { ...data } })
  };

  if (createPlaceModal) {
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
              <span style={{ margin: "10px 0" }} />
              <TextField
                margin="dense"
                name="lat"
                defaultValue="48.8534"
                label="Latitude"
                id="outlined-basic"
                variant="outlined"
                inputRef={register({ required: true })}
              />
              <span style={{ margin: "10px 0" }} />
              <TextField
                margin="dense"
                name="lng"
                defaultValue="2.3488"
                label="Longitude"
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

  if (editPlaceModal) {
    return (
      <Dialog
        open={editPlaceModal}
        onClose={() => closeModal("editPlaceModal")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Update a place.
      </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <form id="add-place-form" onSubmit={handleSubmit(onUpdate)} style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                margin="dense"
                name="name"
                label="Name"
                defaultValue={placeData?.name}
                id="outlined-basic"
                variant="outlined"
                inputRef={register({ required: true })}
              />
              <span style={{ margin: "10px 0" }} />
              <TextField
                margin="dense"
                name="country"
                defaultValue={placeData?.country}
                label="Country"
                id="outlined-basic"
                variant="outlined"
                inputRef={register({ required: true })}
              />
              <span style={{ margin: "10px 0" }} />
              <TextField
                margin="dense"
                name="preview"
                defaultValue={placeData?.preview}
                label="Preview"
                id="outlined-basic"
                variant="outlined"
                inputRef={register({ required: true })}
              />
              <span style={{ margin: "10px 0" }} />
              <TextField
                margin="dense"
                name="code"
                defaultValue={placeData?.code}
                label="Code"
                id="outlined-basic"
                variant="outlined"
                inputRef={register({ required: true })}
              />
              <span style={{ margin: "10px 0" }} />
              <TextField
                margin="dense"
                name="lat"
                defaultValue={placeData?.lat}
                label="Latitude"
                id="outlined-basic"
                variant="outlined"
                inputRef={register({ required: false })}
              />
              <span style={{ margin: "10px 0" }} />
              <TextField
                margin="dense"
                name="lng"
                defaultValue={placeData?.lng}
                label="Longitude"
                id="outlined-basic"
                variant="outlined"
                inputRef={register({ required: false })}
              />
              <span style={{ margin: "10px 0" }} />
              <TextField
                inputProps={{ type: "hidden" }}
                name="id"
                defaultValue={placeData?.id}
                inputRef={register({ required: false })}
              />

            </form>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeModal("editPlaceModal")} color="primary">
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

  return <></>
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider>
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
        </AuthContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
