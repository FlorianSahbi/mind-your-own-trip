import React from "react";
import { CircularProgress, TextField, Button, Typography } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form";
import Spacer from "../Layout/Spacer";
import { GET_PLACE, UPDATE_PLACE } from "../GraphQl/places";

interface UpdatePlaceFormInterface {
  id: string;
  handleSave: () => void;
}

const UpdatePlaceForm = ({ id, handleSave }: UpdatePlaceFormInterface) => {

  const { register, handleSubmit } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useQuery(GET_PLACE, {
    variables: { id }
  })

  const [UpdatePlace] = useMutation(UPDATE_PLACE, {
    onCompleted: ({ updatePlace: { name } }) => {
      enqueueSnackbar(`${name} has been successfully updated`, { variant: "success" });
      handleSave && handleSave();
    }
  })

  const onSubmit = ({ name, country, code, preview, lat, lng }: any) => UpdatePlace({ variables: { id, name, country, code, preview, lat: parseFloat(lat), lng: parseFloat(lng) } });

  if (error) {
    return <p>Error...</p>;
  }

  if (loading) {
    return <CircularProgress />;
  }

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
      <Typography variant="h1">Update {data?.getPlace.name}.</Typography>
      <Spacer
        spacing={20}
        orientation="vertical"
      />
      <TextField
        inputRef={register}
        name="name"
        label="Name"
        variant="outlined"
        defaultValue={data?.getPlace.name}
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
        defaultValue={data?.getPlace.country}
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
        defaultValue={data?.getPlace.code}
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
        defaultValue={data?.getPlace.preview}
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
        defaultValue={data?.getPlace.location.coordinates[1]}
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
        defaultValue={data?.getPlace.location.coordinates[0]}
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

export default UpdatePlaceForm;
