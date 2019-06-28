import React from "react";
import PropTypes from "prop-types";
import { getMatchFetchStatus, getMatch } from "../selectors/MatchSelectors";
import { getEventFetchStatus, getEvent } from "../selectors/EventSelectors";
import { fetchMatch, fetchEvent } from "../actions";
import useData from "../lib/useData";
import notFoundError from "../lib/notFoundError";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Page from "../components/Page";
import Link from "../components/Link";
import MatchVideos from "../components/MatchVideos";

const Match = ({ matchKey, refetchOnLoad }) => {
  const [match, matchFetchStatus, refetchMatch] = useData(
    state => getMatchFetchStatus(state, matchKey),
    state => getMatch(state, matchKey),
    React.useMemo(() => fetchMatch(matchKey), [matchKey]),
    refetchOnLoad.match
  );
  const eventKey = matchKey.split("_")[0];
  const [event, eventFetchStatus, refetchEvent] = useData(
    state => getEventFetchStatus(state, eventKey),
    state => getEvent(state, eventKey),
    React.useMemo(() => fetchEvent(eventKey), [eventKey]),
    refetchOnLoad.event
  );
  const handleRefresh = React.useCallback(() => {
    refetchMatch();
    refetchEvent();
  }, [refetchMatch, refetchEvent]);

  if (!match || !event) {
    return notFoundError();
  }

  return (
    <Page
      title={`${match.getDisplayName()} - ${event.name} (${event.year})`}
      metaDescription={`Match results and video for ${match.getDisplayName()} at the the ${
        event.year
      } ${
        event.name
      } FIRST Robotics Competition in ${event.getCityStateCountry()}.`}
      isLoading={
        matchFetchStatus === "fetching" || eventFetchStatus === "fetching"
      }
      refreshFunction={handleRefresh}
    >
      <Typography variant="h4" gutterBottom>
        {match.getDisplayName()} @{" "}
        <small>
          {match && <Link href={`/event/${eventKey}`}>{event.name}</Link>}
        </small>
      </Typography>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          MatchBreakdownTable
        </Grid>
        <Grid item xs={12} md={6}>
          <MatchVideos match={match} event={event} />
        </Grid>
      </Grid>
    </Page>
  );
};

Match.getInitialProps = async ({ reduxStore, query }) => {
  const matchKey = query.matchKey;
  const eventKey = query.matchKey.split("_")[0];
  const state = reduxStore.getState();

  const matchFetchInitial = getMatchFetchStatus(state, matchKey) !== "success";
  const eventFetchInitial = getEventFetchStatus(state, eventKey) !== "success";

  const fetchPromises = [];
  if (matchFetchInitial) {
    fetchPromises.push(reduxStore.dispatch(fetchMatch(matchKey)));
  }
  if (eventFetchInitial) {
    fetchPromises.push(reduxStore.dispatch(fetchEvent(eventKey)));
  }
  await Promise.all(fetchPromises);

  return {
    matchKey,
    refetchOnLoad: {
      match: !matchFetchInitial,
      event: !eventFetchInitial,
    },
  };
};

Match.propTypes = {
  matchKey: PropTypes.string,
  refetchOnLoad: PropTypes.object,
};

export default Match;