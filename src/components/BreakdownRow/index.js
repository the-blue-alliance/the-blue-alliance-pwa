import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles/index";

const useStyles = makeStyles({
  row: {
    minHeight: 40,
    fontSize: 14,
    borderBottom: "1px solid #ffffff",
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
    backgroundColor: "#f0f0f0",
  },
  lightGrey: {
    backgroundColor: "#ffffff",
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
  data,
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
        {data[1]}
      </Grid>
      <Grid
        className={`${classes.box} ${
          total || subtotal ? classes.grey : classes.lightGrey
        } ${total ? classes.total : ""}`}
        xs={4}
        item
      >
        {data[0]}
      </Grid>
      <Grid
        className={`${classes.box} ${
          total || subtotal ? classes.blue : classes.lightBlue
        } ${total ? classes.total : ""}`}
        style={{ flexDirection: vertical ? "column" : "row" }}
        xs={4}
        item
      >
        {data[2]}
      </Grid>
    </Grid>
  );
};

BreakdownRow.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.bool,
  subtotal: PropTypes.bool,
  vertical: PropTypes.bool,
};

export default React.memo(BreakdownRow);
