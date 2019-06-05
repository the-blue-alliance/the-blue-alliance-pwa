// From https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withRouter } from "next/router";
import MuiLink from "@material-ui/core/Link";
import NextComposedLink from "./NextComposedLink";

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
  const {
    activeClassName,
    router,
    className: classNameProps,
    naked,
    ...other
  } = props;

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName
  });

  if (naked) {
    return <NextComposedLink className={className} {...other} />;
  }

  return (
    <MuiLink component={NextComposedLink} className={className} {...other} />
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
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

Link.defaultProps = {
  activeClassName: "active"
};

export default React.memo(withRouter(Link));
