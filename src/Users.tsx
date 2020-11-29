import React from "react";
import { CircularProgress, Divider, Typography, Theme } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query  GetUsers {
    getUsers {
      _id
      firstName
      lastName
      profilePicure
    }
  }
`;

function User() {
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_USERS);

  if (error) {
    <p>Error...</p>
  }

  if (loading) {
    return (
      <div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>

      {data.getUsers.map(({ firstName, profilePicure, _id }: any) => {
        return (
          <>
            <div
              onClick={() => history.push(`/user/${_id}`)}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                cursor: "pointer"
              }}>
              <Avatar style={{ height: "calc(8*20px)", width: "calc(8*20px)" }} alt={`${firstName}'s profile picture`} src={profilePicure} />
              <Typography variant="h1">
                {firstName}
              </Typography>
            </div>
            <Divider orientation="vertical" />
          </>
        )
      })}
    </div >
  )
}

export default User;
