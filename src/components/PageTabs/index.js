import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";

const useStyles = makeStyles(theme => ({
  tabs: {
    position: "sticky",
    top: 56 - 1,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      top: 48 - 1,
    },
    [theme.breakpoints.up("sm")]: {
      top: 64 - 1,
    },
    marginLeft: -theme.spacing(1),
    marginRight: -theme.spacing(1),
    marginBottom: theme.spacing(2),
    zIndex: theme.zIndex.appBar - 1,
    willChange: "transform", // Fix chrome rendering issue
    color:
      theme.palette.type === "light"
        ? theme.palette.common.black
        : theme.palette.common.white,
  },
}));

const PageTabs = ({ children, value, onChange }) => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.tabs} square>
        <Tabs value={value} onChange={onChange} variant="scrollable">
          {children}
        </Tabs>
      </Paper>
    </>
  );
};

PageTabs.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(PageTabs);
