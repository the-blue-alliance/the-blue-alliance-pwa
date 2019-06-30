// From https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import NextComposedLink from "../NextComposedLink";

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.linkColor,
  },
}));

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
  const { ...other } = props;
  const classes = useStyles();

  return (
    <MuiLink
      component={NextComposedLink}
      classes={{ root: classes.link }}
      {...other}
    />
  );
}

Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};

export default React.memo(Link);
