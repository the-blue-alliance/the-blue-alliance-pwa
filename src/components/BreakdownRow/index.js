import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles/index";

const useStyles = makeStyles({
  row: {
    minHeight: 40,
    fontSize: 14,
    borderBottom: "1px solid #0000001f",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flex: 1,
    paddingBottom: 2,
    paddingTop: 2,
  },
  grey: {
    backgroundColor: "#0000001f",
  },
  lightRed: {
    backgroundColor: "#ff000011",
  },
  red: {
    backgroundColor: "#ff000022",
  },
  lightBlue: {
    backgroundColor: "#0000ff11",
  },
  blue: {
    backgroundColor: "#0000ff22",
  },
  total: {
    fontWeight: "bold",
  },
});

const BreakdownRow = ({
  label,
  red,
  blue,
  total = false,
  subtotal = false,
  vertical = false,
}) => {
  const classes = useStyles();
  return (
    <Grid className={classes.row} container>
      <Grid
        className={`${classes.box} ${
          total || subtotal ? classes.red : classes.lightRed
        } ${total ? classes.total : ""}`}
        style={{ flexDirection: vertical ? "column" : "row" }}
        xs={4}
        item
      >
        {red}
      </Grid>
      <Grid
        className={`${classes.box} ${
          total || subtotal ? classes.grey : classes.lightGrey
        } ${total ? classes.total : ""}`}
        xs={4}
        item
      >
        {label}
      </Grid>
      <Grid
        className={`${classes.box} ${
          total || subtotal ? classes.blue : classes.lightBlue
        } ${total ? classes.total : ""}`}
        style={{ flexDirection: vertical ? "column" : "row" }}
        xs={4}
        item
      >
        {blue}
      </Grid>
    </Grid>
  );
};

BreakdownRow.propTypes = {
  label: PropTypes.string.isRequired,
  red: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  blue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  total: PropTypes.bool,
  subtotal: PropTypes.bool,
  vertical: PropTypes.bool,
};

export default React.memo(BreakdownRow);
