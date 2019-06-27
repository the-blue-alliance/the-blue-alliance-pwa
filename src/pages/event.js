import React from "react";
import PropTypes from "prop-types";
import { getEventFetchStatus, getEvent } from "../selectors/EventSelectors";
import {
  getEventMatchesFetchStatus,
  getEventMatches,
} from "../selectors/MatchSelectors";
import { fetchEvent, fetchEventMatches } from "../actions";
import useData from "../lib/useData";
import notFoundError from "../lib/notFoundError";
import Typography from "@material-ui/core/Typography";
import Page from "../components/Page";
import Link from "../components/Link";
import MatchRow from "../components/MatchRow";
import MatchDialog from "../components/MatchDialog";

const Event = ({ eventKey, refetchOnLoad }) => {
  const [event, eventFetchStatus, refetchEvent] = useData(
    state => getEventFetchStatus(state, eventKey),
    state => getEvent(state, eventKey),
    React.useMemo(() => fetchEvent(eventKey), [eventKey]),
    refetchOnLoad.event
  );
  const [matches, matchesFetchStatus, refetchMatches] = useData(
    state => getEventMatchesFetchStatus(state, eventKey),
    state => getEventMatches(state, eventKey),
    React.useMemo(() => fetchEventMatches(eventKey), [eventKey]),
    refetchOnLoad.eventMatches
  );
  const handleRefresh = React.useCallback(() => {
    refetchEvent();
    refetchMatches();
  }, [refetchEvent, refetchMatches]);

  if (!event) {
    return notFoundError();
  }

  return (
    <Page
      title={`${event.name} (${event.year})`}
      metaDescription={`Videos and match results for the ${event.year} ${
        event.name
      } FIRST Robotics Competition in ${event.getCityStateCountry()}.`}
      additionalMetas={
        <>
          <meta property="og:location" content={event.getCityStateCountry()} />
          <meta property="og:start_time" content={event.start_date} />
          <meta property="og:end_time" content={event.end_date} />
        </>
      }
      isLoading={
        eventFetchStatus === "fetching" || matchesFetchStatus === "fetching"
      }
      refreshFunction={handleRefresh}
    >
      <Typography variant="h4">{event.name}</Typography>
      <Link href="/">Home</Link>
      {matches.map(match => (
        <MatchRow key={match.key} eventKey={eventKey} match={match} />
      ))}
      <MatchDialog eventKey={eventKey} />
    </Page>
  );
};

Event.getInitialProps = async ({ reduxStore, query }) => {
  const eventKey = query.eventKey;
  const state = reduxStore.getState();

  const eventFetchInitial = getEventFetchStatus(state, eventKey) !== "success";
  const eventMatchesFetchInitial =
    getEventMatchesFetchStatus(state, eventKey) !== "success";

  const fetchPromises = [];
  if (eventFetchInitial) {
    fetchPromises.push(reduxStore.dispatch(fetchEvent(eventKey)));
  }
  if (eventMatchesFetchInitial) {
    fetchPromises.push(reduxStore.dispatch(fetchEventMatches(eventKey)));
  }
  await Promise.all(fetchPromises);

  return {
    eventKey,
    refetchOnLoad: {
      event: !eventFetchInitial,
      eventMatches: !eventMatchesFetchInitial,
    },
  };
};

Event.propTypes = {
  eventKey: PropTypes.string,
  refetchOnLoad: PropTypes.object,
};

export default Event;
