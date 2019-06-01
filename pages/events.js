import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { fetchEventListPage } from "../actions";
import {
  getYearEventsStatus,
  getYearEvents
} from "../selectors/EventSelectors";

const useFetch = refetchOnLoad => {
  const status = useSelector(state => getYearEventsStatus(state, 2019));
  const events = useSelector(state => getYearEvents(state, 2019));
  const dispatch = useDispatch();
  useEffect(() => {
    if (refetchOnLoad) {
      dispatch(fetchEventListPage(2019));
    }
  }, []);
  return [events, status, () => dispatch(fetchEventListPage(2019))];
};

const Events = ({ refetchOnLoad }) => {
  const [events, status, refetch] = useFetch(refetchOnLoad);
  return (
    <div>
      <h1>Events</h1>
      <button onClick={refetch}>Refetch</button>
      <div>{status}</div>
      <Link href="/">
        <a>Home</a>
      </Link>
      {events.map(event => (
        <div key={event.key}>
          <Link
            href={`/event?eventKey=${event.key}`}
            as={`/event/${event.key}`}
          >
            <a>
              {event.year} {event.safeShortName()}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

Events.getInitialProps = async ({ reduxStore }) => {
  if (getYearEventsStatus(reduxStore.getState(), 2019) !== "success") {
    await reduxStore.dispatch(fetchEventListPage(2019));
    return { refetchOnLoad: false };
  }
  return { refetchOnLoad: true };
};

Events.propTypes = {
  refetchOnLoad: PropTypes.bool
};

export default Events;
