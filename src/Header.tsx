import { AppBar, Avatar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { FLORIAN_PP } from "./Constants";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';
import LandscapeRoundedIcon from '@material-ui/icons/LandscapeRounded';
import CountrySelect from "./CountryFilter";

const useStylesAppBar = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
});

function ButtonAppBar() {
  const classes = useStylesAppBar();
  return (
    <AppBar position="relative" color="transparent">
      <Toolbar component="header" classes={{ root: classes.root }}>
        <Typography variant="h1">Mind Your Own Trip</Typography>
        {/* <Button>
          <LandscapeRoundedIcon />
          <Typography>Places</Typography>
        </Button>
        <Button>
          <RestaurantRoundedIcon />
          <Typography>Restaurants</Typography>
        </Button> */}
        <Avatar src={FLORIAN_PP} />
      </Toolbar>
    </AppBar>
  );
}

export default ButtonAppBar;
