import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createContainer } from "unstated-next";
import { SnackbarProvider } from "notistack";
import Home from "./Pages/Home";
import User from "./Pages/User";
import Users from "./Pages/Users";
import client from "./Client";

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
          </SnackbarProvider>
        </AuthContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
