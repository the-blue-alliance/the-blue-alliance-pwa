import React from "react";
import PropTypes from "prop-types";
import MatchBreakdown2019 from "./breakdown2019";

const MatchBreakdownTable = ({ match }) => {
  if (match.getYear() === 2019) {
    return <MatchBreakdown2019 match={match} />;
  }
  return <h4>No Breakdown Found</h4>;
};

MatchBreakdownTable.propTypes = {
  match: PropTypes.object.isRequired,
};

export default React.memo(MatchBreakdownTable);
