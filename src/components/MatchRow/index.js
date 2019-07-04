import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Link from "../Link";
import Match from "../../database/Match";

const MatchRow = ({ eventKey, match }) => {
  const matchKey = match.key;
  const openMatchModal = React.useCallback(
    e => {
      e.preventDefault();
      Router.push(
        `/event?eventKey=${eventKey}&matchKey=${matchKey}`,
        `/match/${matchKey}`,
        { shallow: true }
      );
    },
    [eventKey, matchKey]
  );
  return (
    <div>
      <Link href={`/match/${matchKey}`} onClick={openMatchModal}>
        {match.getDisplayName()}
      </Link>
    </div>
  );
};

MatchRow.propTypes = {
  eventKey: PropTypes.string.isRequired,
  match: PropTypes.instanceOf(Match).isRequired,
};

export default React.memo(MatchRow);
