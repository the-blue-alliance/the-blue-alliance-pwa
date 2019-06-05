import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import VideocamIcon from "@material-ui/icons/Videocam";

import NextComposedLink from "../NextComposedLink";

class BottomNavMoreMenu extends React.PureComponent {
  render() {
    const { anchorEl, open, handleClose } = this.props;
    return (
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={handleClose}
          component={NextComposedLink}
          href="/mytba"
          prefetch
        >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="myTBA" />
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={NextComposedLink}
          href="/gameday"
          prefetch
        >
          <ListItemIcon>
            <VideocamIcon />
          </ListItemIcon>
          <ListItemText primary="GameDay" />
        </MenuItem>
      </Menu>
    );
  }
}

BottomNavMoreMenu.propTypes = {
  anchorEl: PropTypes.element,
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default BottomNavMoreMenu;
