import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "./App.css";
import { createStyles, Theme } from "@material-ui/core/styles";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import { G_KEY, places, default_map_pos } from "./Constants";
import GoogleMapReact from "google-map-react";
import CardPlace from "./Card";
import ButtonAppBar from "./Header";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const GET_PLACES = gql`
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

function App() {
  const { data, loading, error } = useQuery(GET_PLACES);

  if (error) {
    return <p>Error...</p>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <div style={{ height: "64px" }} />
      <ButtonAppBar />
      <div style={{ height: "70vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: G_KEY }}
          defaultCenter={default_map_pos}
          defaultZoom={5}
          onClick={(value) => console.log(value)}
        >
          {data.getPlaces?.map(({ name, location: {coordinates: [lng, lat]} }) => (
            <RoomRoundedIcon color="error" size="28px" lat={lat} lng={lng} />
          ))}
        </GoogleMapReact>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(345px, 1fr))",
          gap: "1rem",
          justifyItems: "center",
          padding: "1rem",
        }}
      >
        {console.log(data)}
        {data.getPlaces?.map(
          ({ name, preview, code, country, addedBy: { profilePicure } }) => (
            <CardPlace
              key={`${name}${preview}`}
              name={name}
              src={preview}
              country={country}
              code={code}
              profilePicture={profilePicure}
            />
          )
        )}
      </div>
    </>
  );
}

export default App;
