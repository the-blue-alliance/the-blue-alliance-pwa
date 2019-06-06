import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import amber from "@material-ui/core/colors/amber";
import indigo from "@material-ui/core/colors/indigo";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const createTheme = darkTheme => {
  return createMuiTheme({
    palette: {
      primary: indigo,
      secondary: amber,
      type: darkTheme ? "dark" : "light"
    }
  });
};
const lightTheme = createTheme(false);
const darkTheme = createTheme(true);

const TBAThemeProvider = ({ children }) => {
  const isDarkTheme = useSelector(state => state.getIn(["app", "darkTheme"]));
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
};

TBAThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default TBAThemeProvider;
