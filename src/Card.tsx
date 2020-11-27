import { CardActionArea, Card, CardHeader, Avatar, IconButton, Typography, CardMedia, CardActions, Button, makeStyles } from "@material-ui/core";
import React from "react";
import { DELPHINE_PP, FLORIAN_PP } from "./Constants";
import countryToFlag from "./countryToFlag";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

interface CardInterface {
  name: string;
  src: string;
  code: string;
  country: string;
  profilePicture: string;
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

function CardPlace({ name, src, code, country, profilePicture }: CardInterface) {
  const classes = useStylesCards();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              src={profilePicture}
              aria-label="recipe"
            >
              R
              </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertRoundedIcon />
            </IconButton>
          }
          title={<Typography variant="h2">{name}</Typography>}
          // subheader="September 14, 2016"
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
          <Typography style={{textTransform: "capitalize"}} variant="h6">
            {`${countryToFlag(code)} ${country}`}
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardPlace;