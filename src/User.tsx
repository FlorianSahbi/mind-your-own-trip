import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { useParams } from "react-router-dom";
import React from "react";
import CardPlace from "./Card";
import { DELPHINE_PP, places, users, FLORIAN_PP } from "./Constants";


function User() {
  const { id } = useParams();
  console.log(id)
  return (
    <>
      <div style={{
        // border: "3px solid blue",
        width: "100%",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <Avatar style={{ height: "100px", width: "100px" }} alt="Cindy Baker" src={id === "Florian" ? FLORIAN_PP : DELPHINE_PP} />
        <Typography variant="h1">
          {id}
        </Typography>
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
        {places?.filter(({ user: { firstName } }) => firstName === id).map(
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
