import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// Temporary component for testing
const MatchLink = ({ eventKey, matchKey }) => {
  const as = `/match/${matchKey}`;
  const onClick = React.useCallback(
    e => {
      e.preventDefault();
      Router.replace(`/event?eventKey=${eventKey}&matchKey=${matchKey}`, as, {
        shallow: true,
      });
    },
    [eventKey, matchKey, as]
  );
  return (
    <Link href={as} onClick={onClick}>
      {matchKey}
    </Link>
  );
};
MatchLink.propTypes = {
  eventKey: PropTypes.string.isRequired,
  matchKey: PropTypes.string.isRequired,
};

const TeamAtEventDialog = ({ eventKey, teamKey }) => {
  if (!teamKey) {
    return null;
  }

  return (
    <>
      <Typography>
        {teamKey} @ {eventKey}
      </Typography>
      <MatchLink
        key={teamKey}
        eventKey={eventKey}
        matchKey={`${eventKey}_qm1`}
      />
    </>
  );
};

TeamAtEventDialog.propTypes = {
  eventKey: PropTypes.string.isRequired,
  teamKey: PropTypes.string,
};

export default React.memo(TeamAtEventDialog);
