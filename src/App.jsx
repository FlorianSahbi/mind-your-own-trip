import React, { useState } from "react";
import "./App.css";
import {
  createStyles,
  Theme,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import { G_KEY, places, default_map_pos } from "./Constants";
import GoogleMapReact from "google-map-react";
import CardPlace from "./Card";
import ButtonAppBar from "./Header";

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

function App() {
  const [placesList] = useState(places);
  console.log(placesList);
  return (
    <ThemeProvider theme={theme}>
      <ButtonAppBar />
      <div style={{ height: "70vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: G_KEY }}
          defaultCenter={default_map_pos}
          defaultZoom={5}
          onClick={(value) => console.log(value)}
        >
          {placesList?.map(({ name, position: { lat, lng } }) => (
            <RoomRoundedIcon color="error" size="28px" lat={lat} lng={lng} />
          ))}
        </GoogleMapReact>
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
        {placesList?.map(
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
    </ThemeProvider>
  );
}

export default App;
