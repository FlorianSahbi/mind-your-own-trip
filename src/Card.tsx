import { CardActionArea, Card, CardHeader, Avatar, IconButton, Typography, CardMedia, CardActions, Button, makeStyles, MenuItem, Menu } from "@material-ui/core";
import React, { useState, MouseEvent } from "react";
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

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

function CardPlace({ name, src, code, country, profilePicture }: CardInterface) {
  const classes = useStylesCards();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    console.log(event)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertRoundedIcon />
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
                    width: '20ch',
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </>
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
          <Typography style={{ textTransform: "capitalize" }} variant="h6">
            {`${countryToFlag(code)} ${country}`}
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardPlace;