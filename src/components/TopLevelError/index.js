import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    maxWidth: theme.breakpoints.values.sm,
    textAlign: "center",
  },
}));

const Error = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Whoops!
        </Typography>
        <Typography variant="h4" gutterBottom>
          Something went wrong on our end.
        </Typography>
        <Button
          color="primary"
          className={classes.button}
          variant="contained"
          component="a"
          href="/"
          fullWidth
        >
          Reload THe Blue Alliance
        </Button>
      </Paper>
    </div>
  );
};

export default React.memo(Error);
