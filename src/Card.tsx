import { IconButton, CardActionArea, Card, CardHeader, Avatar, Typography, CardMedia, CardActions, Button, makeStyles, Menu, MenuItem, } from "@material-ui/core";
import React, { useState, MouseEvent } from "react";
import countryToFlag from "./countryToFlag";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { useMutation, gql } from "@apollo/client";
import { DELETE_PLACE } from "./GraphQl/places";
import { DialogContext } from "./App";

interface CardInterface {
  id: string;
  name: string;
  lat: number;
  lng: number;
  src: string;
  code: string;
  country: string;
  profilePicture: string;
  onClick?: () => void;
}

const useStylesCards = makeStyles({
  root: {
    minWidth: "345px",
  },
  CardActions: {
    display: "flex",
    justifyContent: "flex-end",
    // border: "2px solid blue",
  },
});


function CardPlace({ id, name, src, code, country, profilePicture, onClick, lat, lng, }: CardInterface) {
  const classes = useStylesCards();
  const { openModal, setPlaceData } = DialogContext.useContainer();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deletePlace] = useMutation(DELETE_PLACE, {
    update: (cache, { data: { deletePlace } }) => {
      cache.modify({
        fields: {
          getPlaces(existingPlaces = []) {
            const oldPlaceRef = cache.writeFragment({
              data: deletePlace,
              fragment: gql`
                fragment OldPlace on Place {
                  _id
                  name
                  country
                  preview
                  code
                  addedBy {
                    firstName
                    profilePicture
                  }
                  location {
                    coordinates
                  }
                }
              `
            });
            console.log({ oldPlaceRef: oldPlaceRef?.__ref, existingPlaces })
            const newCache = existingPlaces.filter(({ __ref }: any) => __ref !== oldPlaceRef?.__ref);
            return newCache;
          }
        }
      })
    }
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDelete = (id: string) => {
    handleClose();
    deletePlace({ variables: { id } });
  };

  const handleUpdate = (id: string) => {
    handleClose();
    const placeData = { id, name, preview: src, code, country, lat, lng };
    setPlaceData(placeData);
  };

  return (
    <Card onClick={onClick} className={classes.root}>
      <CardHeader
        avatar={profilePicture ? <Avatar src={profilePicture} aria-label="recipe" /> : <Avatar src={profilePicture} aria-label="recipe"> U  </Avatar>}
        title={<Typography variant="h2">{name}</Typography>}
        disableTypography
        action={
          <>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertRoundedIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleUpdate(id)}>Update</MenuItem>
              <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
            </Menu>
          </>
        }
      />
      <CardActionArea>
        <CardMedia
          component="img"
          alt={src}
          height="200"
          image={src}
          title={src}
        />
      </CardActionArea>
      <CardActions classes={{ root: classes.CardActions }}>
        <Button size="small" color="primary">
          <Typography style={{ textTransform: "capitalize" }} variant="h6">
            {`${countryToFlag(code)} ${country}`}
          </Typography>
        </Button>
      </CardActions>
    </Card >
  );
}

export default CardPlace;