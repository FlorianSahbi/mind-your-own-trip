import { Divider, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { DELPHINE_PP, FLORIAN_PP } from "./Constants";


function User() {
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <Avatar style={{ height: "100px", width: "100px" }} alt="Cindy Baker" src={DELPHINE_PP} />
        <Typography variant="h1">
          Delphine
        </Typography>
      </div>
      <Divider orientation="vertical" />
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <Avatar style={{ height: "100px", width: "100px" }} alt="Cindy Baker" src={FLORIAN_PP} />
        <Typography variant="h1">
          Florian
        </Typography>
      </div>
    </div>
  )
}

export default User;
