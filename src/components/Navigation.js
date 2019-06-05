import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Paper from "@material-ui/core/Paper";
import HomeIcon from "@material-ui/icons/Home";
import EventIcon from "@material-ui/icons/Event";
import PeopleIcon from "@material-ui/icons/People";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar
  }
}));

const Navigation = ({ router }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={8} square>
      <BottomNavigation
        value={router.route}
        onChange={(event, newValue) => {
          // Double requestAnimationFrame to ensure smooth animation
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              router.push(newValue);
            })
          );
        }}
        showLabels
      >
        <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Events"
          value="/events"
          icon={<EventIcon />}
        />
        <BottomNavigationAction
          label="Teams"
          value="/teams"
          icon={<PeopleIcon />}
        />
        <BottomNavigationAction
          label="More"
          value="/more"
          icon={<MoreHorizIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

Navigation.propTypes = {
  router: PropTypes.object
};

export default withRouter(Navigation);
