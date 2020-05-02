import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";

import DarkModeContext from "../ThemeProvider/DarkModeContext";

const ThemeToggleListItem = () => {
  const { isDark, toggleDark } = React.useContext(DarkModeContext);

  return (
    <ListItem ContainerComponent="div">
      <ListItemText id="switch-list-label-darktheme" primary="Dark Theme" />
      <ListItemSecondaryAction>
        <Switch
          edge="end"
          onChange={toggleDark}
          checked={isDark}
          inputProps={{
            "aria-labelledby": "switch-list-label-darktheme",
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default React.memo(ThemeToggleListItem);
