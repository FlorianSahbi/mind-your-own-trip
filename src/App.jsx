import React, { useState } from "react";
import "./App.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CardActions from "@material-ui/core/CardActions";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import { useForm, Controller } from "react-hook-form";
import MaterialUIInput from "@material-ui/core/Input";
import { countries } from "./Constants";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import GoogleMapReact from "google-map-react";
import LandscapeRoundedIcon from "@material-ui/icons/LandscapeRounded";
import RestaurantRoundedIcon from "@material-ui/icons/RestaurantRounded";

const G_KEY = "AIzaSyCF9WNdh-Aes4h_jk1ay9DVROddILrVx3s";
export const theme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: "Parisienne",
      fontSize: "18px",
    },
    h3: {
      fontFamily: "OpenSans",
      fontSize: "14px",
    },
  },
});

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

interface CountryType {
  code: string;
  label: string;
  phone: string;
}

interface PlaceInterface {
  name: string;
  country: string;
  preview: string;
  code: string;
}

interface ImgMediaCardInterface {
  name: string;
  src: string;
  code: string;
}

const DEFAULT_PICTURE =
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/08ff2967557635.5b3dce5725b0d.jpg";
const FLORIAN_PP =
  "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/1010155_920552407957107_2288511525204403945_n.jpg?_nc_cat=111&ccb=2&_nc_sid=174925&_nc_ohc=orluLBUFka0AX-CE7oJ&_nc_ht=scontent-cdg2-1.xx&oh=604f1be7307070f0559229b33a29e57f&oe=5FE4B40D";

const DELPHINE_PP =
  "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/123346148_4026631660686124_8765939619000282630_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=VA2vt3VDJO8AX8HRARh&_nc_ht=scontent-cdt1-1.xx&oh=dc497c3d215cd29fd0579a7acc7e6c6d&oe=5FE6099E";

interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: string;
}

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStylesSelect = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

function CountrySelect() {
  const classes = useStylesSelect();

  return (
    <Autocomplete
      id="country-select-demo"
      size="small"
      style={{ width: 300 }}
      options={countries}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <>
          <span>{countryToFlag(option.code)}</span>
          {option.label}
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          // label="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

let places: PlaceInterface[] = [
  {
    code: "AT",
    position: {
      lat: 47.800499,
      lng: 13.04441,
    },
    name: "Salzbourg",
    country: "Autriche",
    preview: "https://www.alibabuy.com/photos/library/1500/12369.jpg",
  },
  {
    code: "CA",
    position: {
      lat: 51.47987,
      lng: 13.46876,
    },
    name: "Haida Gwaii",
    country: "Canada",
    preview:
      "https://www.steppestravel.com/app/uploads/2019/06/ocean-landscape-haida-gwaii-canada-1920x1080.jpg",
  },
  {
    code: "PT",
    position: {
      lat: 32.74054,
      lng: -17.20998,
    },
    name: "Jardim do Mar",
    country: "Portugal",
    preview:
      "https://photo.comptoir.fr/asset/guide/2634/621585-1260x630-jardim-do-mar-madere-portugal.jpg",
  },
  {
    code: "FR",
    position: {
      lat: 46.77352,
      lng: 0.52988,
    },
    name: "Le Sentier des Ocres",
    country: "France",
    preview:
      "https://www.luberon-apt.fr/sites/aptluberon/files/styles/ratio_8_3_xl/public/page/lesocresb8.jpg?itok=7eHiTExy",
  },
  {
    code: "CH",
    position: {
      lat: 51.48733,
      lng: 11.26932,
    },
    name: "Ägerisee Schifffahrt",
    country: "Suisse",
    preview: "https://static.stnet.ch/mice/images/42581-o.jpg",
  },
  {
    code: "FR",
    position: {
      lat: 43.078855,
      lng: 5.784917,
    },
    name: "Île des Embiez",
    country: "France",
    preview:
      "https://www.hyeres-tourisme.com/wp-content/uploads/2018/05/J-Veyssade-Hyeres-Tourisme-51_1024x650_hyeres_tourisme.jpg",
  },
  {
    code: "FR",
    position: {
      lat: 46.603354,
      lng: 1.8883335,
    },
    name: "Les reculées du Jura",
    country: "France",
    preview:
      "https://planet-terre.ens-lyon.fr/planetterre/objets/Images/Img515/515-reculee-Jura-04.jpg",
  },
  {
    code: "ES",
    position: {
      lat: 39.3262345,
      lng: -4.8380649,
    },
    name: "Playa de Gulpiyuri",
    country: "Espagne",
    preview:
      "https://ucmedia.er2.co/es/cor/5/6/1600/o_1cl6kbu2o15uchld1h9b8k66m4u.jpg",
  },
  {
    code: "JP",
    position: {
      lat: 35.362799,
      lng: 138.730781,
    },
    name: "Mont Fuji",
    country: "Japon",
    preview:
      "https://blog.fitmyrun.fr/wp-content/uploads/2018/05/Mont-Fuji.jpg",
  },
  {
    code: "JP",
    position: {
      lat: 35.6116091,
      lng: 139.1986821,
    },
    name: "Mont Koya",
    country: "Japon",
    preview:
      "https://photo.comptoir.fr/asset/mot-cle/602/mont-koya-614887-1440x670.jpg",
  },
  {
    code: "JP",
    position: {
      lat: 35.6116091,
      lng: 139.1986821,
    },
    name: "Kanazawa",
    country: "Japon",
    preview: "https://pix6.agoda.net/geo/city/18826/1_18826_02.jpg?s=1920x822",
  },
  {
    code: "JP",
    position: {
      lat: 34.9689499,
      lng: 135.7692576,
    },
    name: "Fushimi Inari",
    country: "Japon",
    preview:
      "https://d1wv60jaas5mse.cloudfront.net/images/uploads/production/post_images/2d86bc2cb466ea_Famous%20Red%20Gates%20at%20Fushimi%20Inari%20Taisha.jpg",
  },
  {
    code: "AR",
    position: {
      lat: 35.6116091,
      lng: 139.1986821,
    },
    name: "Sendero al Fitz Roy",
    country: "Argentine",
    preview:
      "https://milesandlove.com/system/attachments/1644/xxlarge/impressionnant-fitz-roy.jpg?1509449940",
  },
  {
    code: "JP",
    position: {
      lat: -49.2812866,
      lng: -72.9611904,
    },
    name: "Kinkakuji",
    country: "Japon",
    preview:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Water_reflection_of_Kinkaku-ji_Temple_a_sunny_day%2C_Kyoto%2C_Japan.jpg/1200px-Water_reflection_of_Kinkaku-ji_Temple_a_sunny_day%2C_Kyoto%2C_Japan.jpg",
  },
  {
    code: "JP",
    position: {
      lat: 35.0395293,
      lng: 135.7295373,
    },
    name: "Sensoji-ji",
    country: "Japon",
    preview: "https://ak.picdn.net/shutterstock/videos/6325205/thumb/1.jpg",
  },
  {
    code: "JP",
    position: {
      lat: 35.6116091,
      lng: 139.1986821,
    },
    name: "Arashiyama",
    country: "Japon",
    preview:
      "https://www.jrailpass.com/blog/wp-content/uploads/2016/05/arashiyama-bamboo-grove-kyoto-e1466611768221-1280x720.jpg",
  },
  {
    code: "JP",
    position: {
      lat: 35.5130557,
      lng: 138.7448372,
    },
    name: "Lac Kawaguchi",
    country: "Japon",
    preview: "https://www.myatlas.xyz/gallery/2000/5a17eee8569619a891ej.jpg?1",
  },
  {
    code: "IT",
    position: {
      lat: 44.548988,
      lng: 8.6225095,
    },
    name: "Costiera Amalfitana",
    country: "Italie",
    preview:
      "https://admin.pettinaviaggi.it/images/viaggi/1cc408ac-9e93-4178-87b8-8df339515633_AMALFI2.jpg",
  },
];

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

function Form({ setter }) {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = ({ name, preview }) => {
    places = [{ name, preview, country: null }, ...places];
    setter(places);
    reset();
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={MaterialUIInput}
          name="name"
          placeholder="name"
          control={control}
          defaultValue=""
          className="materialUIInput"
        />
        <Controller
          as={MaterialUIInput}
          name="preview"
          placeholder="preview"
          control={control}
          defaultValue=""
          className="materialUIInput"
        />
        <Button type="submit">Done</Button>
      </form>
    </div>
  );
}

function ButtonAppBar() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Typography>NomDuSite</Typography>
        <Button>
          <LandscapeRoundedIcon />
          <Typography>Places</Typography>
        </Button>
        <Button>
          <RestaurantRoundedIcon />
          <Typography>Restaurants</Typography>
        </Button>
        <CountrySelect />
        <Avatar src={FLORIAN_PP} />
        <Button>Hi Florian</Button>
      </Toolbar>
    </AppBar>
  );
}

function ImgMediaCard({ name, src, code, country }: ImgMediaCardInterface) {
  const classes = useStylesCards();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              src={Math.random() < 0.6 ? DELPHINE_PP : FLORIAN_PP}
              aria-label="recipe"
              className={classes.avatar}
            >
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<Typography variant="h3">{name}</Typography>}
          subheader="September 14, 2016"
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
          <Typography variant="h3">
            {`${countryToFlag(code)} ${country}`}
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}

function App() {
  const [placesList, setPlacesList] = useState(places);
  return (
    <ThemeProvider theme={theme}>
      <ButtonAppBar />
      <CustomizedDialogs />
      <Form setter={setPlacesList} />
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: G_KEY }}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={11}
        >
          {placesList?.map(({ name, position: { lat, lng } }) => (
            <div
              style={{
                height: "50px",
                width: "50px",
                backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "white",
              }}
              lat={lat}
              lng={lng}
            >
              {name}
            </div>
          ))}
        </GoogleMapReact>
      </div>
      <div
        className="App"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(345px, 1fr))",
          gap: "1rem",
          justifyItems: "center",
          padding: "1rem",
          // border: "3px solid blue",
        }}
      >
        {placesList?.map(({ name, preview, code, country }) => (
          <ImgMediaCard
            key={`${name}${preview}`}
            name={name}
            src={preview}
            country={country}
            code={code}
          />
        ))}
      </div>
    </ThemeProvider>
  );
}

export default App;
