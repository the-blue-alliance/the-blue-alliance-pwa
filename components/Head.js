import React from "react";
import PropTypes from "prop-types";
import { default as NextHead } from "next/head";

const Head = ({ title, children }) => (
  <NextHead>
    <title>{title && `${title} - `}The Blue Alliance</title>
    {children}
  </NextHead>
);

Head.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element
};

export default Head;
