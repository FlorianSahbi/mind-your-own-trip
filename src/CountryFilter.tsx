import { makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { countries, CountryType } from "./Constants";
import countryToFlag from "./countryToFlag";

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
      options={countries as CountryType[]}
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

export default CountrySelect;
