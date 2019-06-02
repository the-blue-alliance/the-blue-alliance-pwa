import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { default as NextHead } from "next/head";

const Head = ({ router, children, title }) => (
  <NextHead>
    <title>{title && `${title} - `}The Blue Alliance</title>
    <link
      rel="canonical"
      href={`https://www.thebluealliance.com${router.asPath}`}
    />

    {children}
  </NextHead>
);

Head.propTypes = {
  router: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  title: PropTypes.string
};

export default withRouter(Head);
