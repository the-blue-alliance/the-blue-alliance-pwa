import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import HomeIcon from "@material-ui/icons/Home";
import EventIcon from "@material-ui/icons/Event";
import PeopleIcon from "@material-ui/icons/People";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import BottomNavButton from "./BottomNavButton";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    display: "flex"
  }
}));

const Navigation = ({ router: { route } }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} square>
      <BottomNavButton
        label="Home"
        icon={HomeIcon}
        href="/"
        active={route === "/"}
        prefetch
      />
      <BottomNavButton
        label="Events"
        icon={EventIcon}
        href="/events"
        active={route === "/events"}
        prefetch
      />
      <BottomNavButton
        label="Teams"
        icon={PeopleIcon}
        href="/teams"
        active={route === "/teams"}
        prefetch
      />
      <BottomNavButton
        label="More"
        icon={MoreHorizIcon}
        href="/navmore"
        active={route === "/navmore"}
      />
    </Paper>
  );
};

Navigation.propTypes = {
  router: PropTypes.object
};

export default withRouter(Navigation);