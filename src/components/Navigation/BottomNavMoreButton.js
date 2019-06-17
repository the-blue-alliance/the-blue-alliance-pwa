import React from "react";
import PropTypes from "prop-types";

import BottomNavButton from "./BottomNavButton";

const BottomNavMoreButton = ({ setAnchorEl, ...restProps }) => {
  const handleMenuOpen = React.useCallback(
    event => {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  return <BottomNavButton onClick={handleMenuOpen} {...restProps} />;
};

BottomNavMoreButton.propTypes = {
  setAnchorEl: PropTypes.func,
};

export default React.memo(BottomNavMoreButton);
