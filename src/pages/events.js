import React from "react";
import PropTypes from "prop-types";
import {
  getYearEventsFetchStatus,
  getYearEvents
} from "../selectors/EventSelectors";
import { fetchYearEvents } from "../actions";
import useData from "../lib/useData";
import notFoundError from "../lib/notFoundError";
import Page from "../components/Page";
import Link from "../components/Link";
import Typography from "@material-ui/core/Typography";

const Events = ({ year, refetchOnLoad }) => {
  const [events, eventsFetchStatus, refetchEvents] = useData(
    state => getYearEventsFetchStatus(state, year),
    state => getYearEvents(state, year),
    fetchYearEvents(year),
    refetchOnLoad.events
  );

  if (!events) {
    return notFoundError();
  }

  return (
    <Page
      title={`${year} Events`}
      metaDescription={`List of events for the ${year} FIRST Robotics Competition.`}
      isLoading={eventsFetchStatus === "fetching"}
      refreshFunction={refetchEvents}
    >
      <Typography variant="h4">{year} Events</Typography>
      <Link href="/">Home</Link>
      {events.map(event => (
        <div key={event.key}>
          <Link
            href={`/event?eventKey=${event.key}`}
            as={`/event/${event.key}`}
          >
            {event.year} {event.safeShortName()}
          </Link>
        </div>
      ))}
    </Page>
  );
};

Events.getInitialProps = async ({ reduxStore, query }) => {
  let year = 2019;
  if (query.year) {
    year = parseInt(query.year, 10);
  }
  const state = reduxStore.getState();

  const eventsFetchInitial =
    getYearEventsFetchStatus(state, year) !== "success";

  const fetchPromises = [];
  if (eventsFetchInitial) {
    fetchPromises.push(reduxStore.dispatch(fetchYearEvents(year)));
  }
  await Promise.all(fetchPromises);

  return {
    year,
    refetchOnLoad: {
      events: !eventsFetchInitial
    }
  };
};

Events.propTypes = {
  year: PropTypes.number,
  refetchOnLoad: PropTypes.object
};

export default Events;
