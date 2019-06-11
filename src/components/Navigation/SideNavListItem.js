import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import NextComposedLink from "../NextComposedLink";

const useStyles = makeStyles(theme => ({
  activeIcon: {
    color:
      theme.palette.type === "light"
        ? theme.palette.primary.main
        : theme.palette.secondary.main
  },
  activeText: {
    color:
      theme.palette.type === "light"
        ? theme.palette.common.black
        : theme.palette.common.white,
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const SideNavListItem = ({ href, icon: Icon, text, active }) => {
  const classes = useStyles();

  return (
    <ListItem button component={NextComposedLink} href={href} selected={active}>
      <ListItemIcon className={active ? classes.activeIcon : null}>
        <Icon />
      </ListItemIcon>
      <ListItemText
        classes={active ? { primary: classes.activeText } : null}
        primary={text}
      />
    </ListItem>
  );
};

SideNavListItem.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default React.memo(SideNavListItem);
