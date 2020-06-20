import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Router from "next/router";

const MIN_YEAR = 1992;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
}));

const EventYearPicker = ({ selectedYear }) => {
  const classes = useStyles();

  const maxYear = 2020; // TODO: pull this from the /status endpoint
  const years = Array.from(
    Array(maxYear - MIN_YEAR + 1),
    (v, i) => maxYear - i
  );

  const updateYear = React.useCallback(event => {
    const year = event.target.value;
    const as = `/events/${year}`;

    Router.push(`/events/${year}`, as, {
      shallow: true,
    });
  }, []);

  return (
    <FormControl className={classes.formControl}>
      <Select value={selectedYear} onChange={updateYear}>
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
  selectedYear: PropTypes.number,
  years: PropTypes.array,
};

export default React.memo(EventYearPicker);
