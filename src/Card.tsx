import { CardActionArea, Card, CardHeader, Avatar, Typography, CardMedia, CardActions, Button, makeStyles, } from "@material-ui/core";
import React, { useState, MouseEvent } from "react";
import countryToFlag from "./countryToFlag";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

interface CardInterface {
  name: string;
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


function CardPlace({ name, src, code, country, profilePicture, onClick, }: CardInterface) {
  console.log(profilePicture)
  const classes = useStylesCards();

  return (
    <Card onClick={onClick} className={classes.root}>
      <CardActionArea>
        <CardHeader
          avatar={profilePicture ? <Avatar src={profilePicture} aria-label="recipe" /> : <Avatar src={profilePicture} aria-label="recipe"> U  </Avatar>}
          title={<Typography variant="h2">{name}</Typography>}
        />
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