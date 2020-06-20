import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EventYearPicker = ({ years }) => {
  const classes = useStyles();
  const [year, setYear] = React.useState(2020);

  const updateYear = React.useCallback(
    event => {
      setYear(event.target.value);
    },
    [setYear]
  );

  return (
    <FormControl className={classes.formControl}>
      <Select value={year} onChange={updateYear}>
        {years.map(year => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

EventYearPicker.propTypes = {
  years: PropTypes.array,
};

export default React.memo(EventYearPicker);
