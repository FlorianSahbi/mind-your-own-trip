import React from "react";
import {
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import User from "./User";
import Users from "./Users";

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
