import { gql } from "@apollo/client";
import { TextField, Button, Typography } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form";
import Spacer from "../Layout/Spacer";
import { CREATE_PLACE } from "../GraphQl/places";
import React from "react";

interface CreatePlaceFormInterface {
  addedBy: string;
  handleSave?: () => void;
}

const CreatePlaceForm = ({ addedBy, handleSave }: CreatePlaceFormInterface) => {

  const { register, handleSubmit } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const [CreatePlace] = useMutation(CREATE_PLACE, {
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
      })
    },
    onCompleted: ({ createPlace: { name } }) => {
      enqueueSnackbar(`${name} has been successfully created`, { variant: "success" });
      handleSave && handleSave();
    }
  })

  const onSubmit = ({ name, country, code, preview, lat, lng }: any) => CreatePlace({ variables: { name, country, code, preview, lat: parseFloat(lat), lng: parseFloat(lng), addedBy } });

  return (
    <form
      id="update-place-form"
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
      <Typography variant="h1">Create a place.</Typography>
      <Spacer
        spacing={20}
        orientation="vertical"
      />
      <TextField
        inputRef={register}
        name="name"
        label="Name"
        variant="outlined"
      />
      <Spacer
        spacing={15}
        orientation="vertical"
      />
      <TextField
        inputRef={register}
        name="country"
        label="Country"
        variant="outlined"
      />
      <Spacer
        spacing={15}
        orientation="vertical"
      />
      <TextField
        inputRef={register}
        name="code"
        label="Code"
        variant="outlined"
      />
      <Spacer
        spacing={15}
        orientation="vertical"
      />
      <TextField
        inputRef={register}
        name="preview"
        label="Preview url"
        variant="outlined"
      />
      <Spacer
        spacing={15}
        orientation="vertical"
      />
      <TextField
        inputRef={register}
        name="lat"
        label="Latitude"
        variant="outlined"
      />
      <Spacer
        spacing={15}
        orientation="vertical"
      />
      <TextField
        inputRef={register}
        name="lng"
        label="Longitude"
        variant="outlined"
      />
      <Spacer
        spacing={15}
        orientation="vertical"
      />
      <Button
        type="submit"
        form="update-place-form"
        color="primary"
        autoFocus
      >
        Save
      </Button>
    </form>
  )
}

export default CreatePlaceForm;
