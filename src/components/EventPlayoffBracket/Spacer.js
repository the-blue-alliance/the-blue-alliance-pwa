import React from "react";
import { makeStyles } from "@material-ui/core/styles/index";

const useStyles = makeStyles({
  spacer: {
    flexGrow: 1,
    "&:first-child": {
      flexGrow: 0.5,
    },
    "&:last-child": {
      flexGrow: 0.5,
    },
  },
});

const Spacer = () => {
  const classes = useStyles();
  return <div className={classes.spacer} />;
};

export default React.memo(Spacer);
