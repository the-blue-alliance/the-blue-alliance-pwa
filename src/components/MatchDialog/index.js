import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import useData from "../../lib/useData";
import { getMatchFetchStatus, getMatch } from "../../selectors/MatchSelectors";

// Temporary component for testing
const TeamLink = ({ eventKey, teamKey }) => {
  const year = eventKey.substring(0, 4);
  const as = `/team/${teamKey}/${year}`;
  const onClick = React.useCallback(
    e => {
      e.preventDefault();
      Router.push(`/event?eventKey=${eventKey}&teamKey=${teamKey}`, as, {
        shallow: true,
      });
    },
    [eventKey, teamKey, as]
  );
  return (
    <MuiLink href={as} onClick={onClick}>
      {teamKey}
    </MuiLink>
  );
};
TeamLink.propTypes = {
  eventKey: PropTypes.string.isRequired,
  teamKey: PropTypes.string.isRequired,
};

const MatchDialog = ({ eventKey, matchKey }) => {
  const [match, matchFetchStatus] = useData(
    state => getMatchFetchStatus(state, matchKey),
    state => getMatch(state, matchKey)
  );

  if (!match) {
    return null;
  }

  if (matchFetchStatus !== "success") {
    return <Typography>Something went wrong</Typography>;
  }

  return (
    <>
      <Typography>{match.getDisplayName()}</Typography>
      <div>
        {match.getIn(["alliances", "red", "team_keys"]).map(teamKey => (
          <TeamLink key={teamKey} eventKey={eventKey} teamKey={teamKey} />
        ))}
      </div>
      <div>
        {match.getIn(["alliances", "blue", "team_keys"]).map(teamKey => (
          <TeamLink key={teamKey} eventKey={eventKey} teamKey={teamKey} />
        ))}
      </div>
    </>
  );
};

MatchDialog.propTypes = {
  eventKey: PropTypes.string.isRequired,
  matchKey: PropTypes.string,
};

export default React.memo(MatchDialog);
