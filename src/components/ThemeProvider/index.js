import React from "react";
import PropTypes from "prop-types";
import amber from "@material-ui/core/colors/amber";
import indigo from "@material-ui/core/colors/indigo";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import useDarkMode from "use-dark-mode";
import DarkModeContext from "./DarkModeContext";

const createTheme = darkTheme => {
  return createMuiTheme({
    palette: {
      primary: indigo,
      secondary: amber,
      linkColor: darkTheme ? amber[500] : indigo[500],
      type: darkTheme ? "dark" : "light",
    },
  });
};
const lightTheme = createTheme(false);
const darkTheme = createTheme(true);

const TBAThemeProvider = ({ children }) => {
  const [isDark, setDark] = React.useState(false);
  const darkMode = useDarkMode(false, {
    onChange: value => setDark(value),
  });

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark: darkMode.toggle }}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

TBAThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default TBAThemeProvider;
