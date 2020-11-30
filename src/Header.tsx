import { AppBar, Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import React, { useState, MouseEvent } from "react";
import { FLORIAN_PP } from "./Constants";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import { useHistory } from "react-router-dom";
import LandscapeRoundedIcon from '@material-ui/icons/LandscapeRounded';
import RestaurantMenuRoundedIcon from '@material-ui/icons/RestaurantMenuRounded';
import logo from "./logo.png";
import { DialogContext } from "./App";

const useStylesAppBar = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const options = [
  "Place",
  "Restaurant",
];

const ITEM_HEIGHT = 48;

function ButtonAppBar() {
  const classes = useStylesAppBar();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { openModal } = DialogContext.useContainer();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" color="transparent" style={{ backgroundColor: "white" }} >
        <Toolbar component="header" classes={{ root: classes.root }}>
          <div style={{
            // border: "3px solid blue", 
            height: "100%",
            width: "50%",
            display: "flex",
          }}>
            <Avatar src={logo} />
            <span style={{ marginRight: "10px" }} />
            <Typography variant="h1">Mind Your Own Trip</Typography>
          </div>
          <div style={{
            // border: "3px solid blue", 
            height: "100%",
            width: "50%",
            display: "flex",
            justifyContent: "flex-end"
          }}>
            <IconButton
              aria-label="add"
              style={{ height: "40px", width: "40px" }}
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <AddCircleRoundedIcon style={{ height: "30px", width: "30px" }} />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '360px',
                },
              }}
            >
              <MenuItem>
                <ListItemText primary="Add" />
              </MenuItem>
              <MenuItem onClick={() => {
                handleClose();
                openModal("createPlaceModal");
              }}>
                <ListItemAvatar>
                  <Avatar>
                    <LandscapeRoundedIcon style={{ height: "30px", width: "30px" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Place" secondary="Add a place in our list." />
              </MenuItem>
              <MenuItem disabled onClick={handleClose}>
                <ListItemAvatar>
                  <Avatar>
                    <RestaurantMenuRoundedIcon style={{ height: "30px", width: "30px" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Restaurant" secondary="Add a restaurant in our list." />
              </MenuItem>
            </Menu>

            <IconButton style={{ height: "40px", width: "40px" }} onClick={() => history.push("/users")} aria-label="users">
              <PeopleRoundedIcon style={{ height: "30px", width: "30px" }} />
            </IconButton>

            <IconButton style={{ height: "40px", width: "40px" }} onClick={() => history.push("/user/5fc2c0b1be242627fe187564")} aria-label="users">
              <Avatar src={FLORIAN_PP} style={{ height: "30px", width: "30px" }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar >

    </>
  );
}

export default ButtonAppBar;
