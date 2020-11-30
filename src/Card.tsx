import { CardActionArea, Card, CardHeader, Avatar, IconButton, Typography, CardMedia, CardActions, Button, makeStyles, MenuItem, Menu } from "@material-ui/core";
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
  const classes = useStylesCards();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card onClick={onClick} className={classes.root}>
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
    </Card>
  );
}

export default CardPlace;