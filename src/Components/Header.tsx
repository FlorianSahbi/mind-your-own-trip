import { AppBar, Avatar, Button, Dialog, IconButton, ListItemAvatar, ListItemText, makeStyles, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import React, { useState, MouseEvent } from "react";
import { useQuery } from "@apollo/client";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import LoopRoundedIcon from '@material-ui/icons/LoopRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import { useHistory } from "react-router-dom";
import LandscapeRoundedIcon from '@material-ui/icons/LandscapeRounded';
import RestaurantMenuRoundedIcon from '@material-ui/icons/RestaurantMenuRounded';
import logo from "../logo.png";
import { AuthContext } from "../App";
import { GET_USERS } from "../GraphQl/users";
import { useSnackbar } from "notistack";
import Spacer from "../Layout/Spacer";
import CreatePlaceForm from "./CreatePlaceForm";


const useStylesAppBar = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: "64px",
  },
});

const ITEM_HEIGHT = 48;

const CreatePOI = () => {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const { activeUser } = AuthContext.useContainer();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="add"
        style={{ height: "40px", width: "40px" }}
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        disabled={!activeUser}
      >
        <Avatar style={{ height: "40px", width: "40px" }}>
          <AddCircleRoundedIcon style={{ height: "30px", width: "30px" }} />
        </Avatar>
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
          setCreateModal(true);
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

      <Dialog
        open={createModal}
        onClose={() => setCreateModal(false)}
      >
        {activeUser && <CreatePlaceForm addedBy={activeUser?._id} handleSave={() => setCreateModal(false)} />}
        {!activeUser && <p>No Selected User</p>}
      </Dialog>
    </>
  )
}

function SelectUser(): React.ReactElement {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { setActiveUser, activeUser } = AuthContext.useContainer();
  const { data, loading, error } = useQuery(GET_USERS);

  if (error) {
    return <p>Error...</p>
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (activeUser) {
    return (
      <>
        <Spacer orientation="horizontal" spacing={10} />
        <IconButton style={{ height: "40px", width: "40px" }} onClick={() => history.push(`user/${activeUser?._id}`)} aria-label="users">
          <Avatar style={{ height: "40px", width: "40px" }}>
            <Avatar src={activeUser?.profilePicture} style={{ height: "30px", width: "30px" }} />
          </Avatar>
        </IconButton>
        <Spacer orientation="horizontal" spacing={10} />
        <IconButton style={{ height: "40px", width: "40px" }} onClick={() => { setActiveUser(activeUser?._id === data.getUsers[0]._id ? data.getUsers[1] : data.getUsers[0]); enqueueSnackbar(`Bye ${activeUser?.firstName} !`) }} aria-label="users">
          <Avatar style={{ height: "40px", width: "40px" }}>
            <LoopRoundedIcon style={{ height: "30px", width: "30px" }} />
          </Avatar>
        </IconButton>
      </>
    )
  }

  return (
    <>
      <Spacer orientation="horizontal" spacing={10} />
      <IconButton style={{ height: "40px", width: "40px" }} disabled>
        <Avatar style={{ height: "40px", width: "40px" }}>
          <Avatar style={{ height: "30px", width: "30px" }} />
        </Avatar>
      </IconButton>
      <Spacer orientation="horizontal" spacing={10} />
      <IconButton style={{ height: "40px", width: "40px" }} onClick={() => { setActiveUser(data.getUsers[1]); enqueueSnackbar(`Hi ${data.getUsers[1]?.firstName} !`) }} aria-label="users">
        <Avatar style={{ height: "40px", width: "40px" }}>
          <LoopRoundedIcon style={{ height: "30px", width: "30px" }} />
        </Avatar>
      </IconButton>
    </>
  )
}

function ButtonAppBar() {
  const classes = useStylesAppBar();
  const history = useHistory();
  const mobile = useMediaQuery('(min-width:610px)');

  return (
    <>
      <AppBar position="fixed" color="transparent" style={{ backgroundColor: "white", minHeight: "64px" }} >
        <Toolbar component="header" classes={{ root: classes.root }}>
          <div style={{
            // border: "3px solid blue", 
            height: "100%",
            width: "fit-content",
            display: "flex",
          }}>
            <Button style={{ textTransform: "capitalize" }} onClick={() => history.push("/")}>
              <Avatar src={logo} />
              <span style={{ marginRight: "10px" }} />
              {
                mobile && <Typography variant="h1">Mind Your Own Trip</Typography>
              }
            </Button>
          </div>
          <div style={{
            // border: "3px solid blue", 
            height: "100%",
            width: "fit-content",
            display: "flex",
            justifyContent: "flex-end"
          }}>
            <CreatePOI />
            <Spacer orientation="horizontal" spacing={10} />
            <IconButton style={{ height: "40px", width: "40px" }} onClick={() => history.push("/users")} aria-label="users">
              <Avatar>
                <PeopleRoundedIcon style={{ height: "30px", width: "30px" }} />
              </Avatar>
            </IconButton>
            <SelectUser />
          </div>
        </Toolbar>
      </AppBar >
    </>
  );
}

export default ButtonAppBar;
