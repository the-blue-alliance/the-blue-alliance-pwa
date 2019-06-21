import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";

const NextComposed = (props, ref) => {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
};

const NextComposedLink = React.forwardRef(NextComposed);

NextComposed.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  prefetch: PropTypes.bool,
};

export default NextComposedLink;
