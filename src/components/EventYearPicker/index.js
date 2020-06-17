import React from "react";
import PropTypes from "prop-types";

const EventYearPicker = ({ years }) => {
  return <div>TODO: YEAR PICKER & SECTIONS ({years.join(", ")})</div>;
};

EventYearPicker.propTypes = {
  years: PropTypes.array,
};

export default React.memo(EventYearPicker);
