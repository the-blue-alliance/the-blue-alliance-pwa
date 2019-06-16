// From https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import NextComposedLink from "./NextComposedLink";

const useStyles = makeStyles(theme => ({
  link: {
    color:
      theme.palette.type === "light"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  },
}));

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
  const { activeClassName, className: classNameProps, naked, ...other } = props;
  const router = useRouter();
  const classes = useStyles();

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
  });

  if (naked) {
    return <NextComposedLink className={className} {...other} />;
  }

  return (
    <MuiLink
      component={NextComposedLink}
      className={className}
      classes={{ root: classes.link }}
      {...other}
    />
  );
}

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};

Link.defaultProps = {
  activeClassName: "active",
};

export default React.memo(Link);
