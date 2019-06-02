import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router, { withRouter } from "next/router";
import { getEventFetchStatus, getEvent } from "../selectors/EventSelectors";
import {
  getEventMatchesFetchStatus,
  getEventMatches
} from "../selectors/MatchSelectors";
import { fetchEvent, fetchEventMatches } from "../actions";
import useData from "../lib/useData";
import Head from "../components/Head";

const openMatchModal = (e, eventKey, matchKey) => {
  e.preventDefault();
  Router.push(
    `/event?eventKey=${eventKey}&matchKey=${matchKey}`,
    `/match/${matchKey}`,
    { shallow: true }
  );
};

const closeMatchModal = eventKey => {
  Router.push(`/event?eventKey=${eventKey}`, `/event/${eventKey}`, {
    shallow: true
  });
};

const Events = ({ router, eventKey, refetchOnLoad }) => {
  const [event, eventFetchStatus, refetchEvent] = useData(
    state => getEventFetchStatus(state, eventKey),
    state => getEvent(state, eventKey),
    fetchEvent(eventKey),
    refetchOnLoad.event
  );
  const [matches, matchesFetchStatus, refetchMatches] = useData(
    state => getEventMatchesFetchStatus(state, eventKey),
    state => getEventMatches(state, eventKey),
    fetchEventMatches(eventKey),
    refetchOnLoad.eventMatches
  );

  return (
    <div>
      <Head title={`${event.name} (${event.year})`} />
      <h1>{event.name}</h1>
      <button
        onClick={() => {
          refetchEvent();
          refetchMatches();
        }}
      >
        Refetch
      </button>
      <div>{eventFetchStatus}</div>
      <div>{matchesFetchStatus}</div>
      <div onClick={() => closeMatchModal(eventKey)}>
        {router.query.matchKey}
      </div>
      <Link href="/">
        <a>Home</a>
      </Link>
      {matches.map(match => (
        <div key={match.key}>
          <a
            href={`/match/${match.key}`}
            onClick={e => openMatchModal(e, eventKey, match.key)}
          >
            {match.getDisplayName()}
          </a>
        </div>
      ))}
    </div>
  );
};

Events.getInitialProps = async ({ reduxStore, query }) => {
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
      eventMatches: !eventMatchesFetchInitial
    }
  };
};

Events.propTypes = {
  router: PropTypes.object,
  eventKey: PropTypes.string,
  refetchOnLoad: PropTypes.object
};

export default withRouter(Events);
