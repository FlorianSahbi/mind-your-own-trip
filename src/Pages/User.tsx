import React, { CSSProperties } from "react";
import { Typography, CircularProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER } from "../GraphQl/users";
import UpdateUserForm from "../Components/UpdateUserForm";
import CreatePlaceForm from "../Components/CreatePlaceForm";

const root: CSSProperties = {
  width: "100%",
  height: "250px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  // border: "3px solid blue",
}

const stylesForm: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  // border: "3px solid blue",
}

function User() {
  // @ts-ignore
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id }
  })

  if (error) {
    return <p>Error...</p>
  }

  if (loading) {
    return (
      <div style={root}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <div style={root}>
        <Avatar style={{ height: "100px", width: "100px" }} alt="Cindy Baker" src={data.getUser.profilePicture} />
        <Typography variant="h1">
          {data.getUser.firstName}
        </Typography>
      </div>
      <div style={stylesForm}>
        <UpdateUserForm id={id} />
      </div >
    </>
  )
}

export default User;
