import React from "react";
import PropTypes from "prop-types";
import { default as NextHead } from "next/head";

const Head = ({ children, title }) => (
  <NextHead>
    <title>{title && `${title} - `}The Blue Alliance</title>
    {children}
  </NextHead>
);

Head.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  title: PropTypes.string
};

export default Head;
