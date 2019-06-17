import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";

import { toggleTheme } from "../../actions";

const ThemeToggleListItem = () => {
  const darkTheme = useSelector(state => state.getIn(["app", "darkTheme"]));
  const dispatch = useDispatch();

  const handleToggle = React.useCallback(() => dispatch(toggleTheme()), [
    dispatch,
  ]);

  return (
    <ListItem ContainerComponent="div">
      <ListItemText id="switch-list-label-darktheme" primary="Dark Theme" />
      <ListItemSecondaryAction>
        <Switch
          edge="end"
          onChange={handleToggle}
          checked={darkTheme}
          inputProps={{
            "aria-labelledby": "switch-list-label-darktheme",
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default React.memo(ThemeToggleListItem);
