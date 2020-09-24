import React from "react";
import PropTypes from "prop-types";
import {
  getYearEventsFetchStatus,
  getYearEvents,
} from "../selectors/EventSelectors";
import { fetchYearEvents } from "../actions";
import useData from "../lib/useData";
import useQueryParam from "../lib/useQueryParam";
import useQueryParamSet from "../lib/useQueryParamSet";
import notFoundError from "../lib/notFoundError";
import Page from "../components/Page";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EventListSearchCard from "../components/EventListSearchCard";
import EventYearPicker from "../components/EventYearPicker";
import GroupedEventList from "../components/GroupedEventList";
import Event from "../database/Event";

const Events = ({ year, refetchOnLoad }) => {
  const [rawEvents, eventsFetchStatus, refetchEvents] = useData(
    state => getYearEventsFetchStatus(state, year),
    state => getYearEvents(state, year),
    React.useMemo(() => fetchYearEvents(year), [year]),
    refetchOnLoad.events
  );

  // Apply sort and filters from URL query
  const searchStr = useQueryParam("search")[0];
  const filters = useQueryParamSet("filters")[0];
  const events = React.useMemo(
    () =>
      rawEvents
        .filter(
          // Filter by district
          event => {
            if (filters.size === 0) {
              return true;
            }
            if (event.isRegional() && filters.has("regional")) {
              return true;
            }
            if (
              event.district &&
              filters.has(event.district.get("abbreviation"))
            ) {
              return true;
            }
            return false;
          }
        )
        .filter(
          // Filter by name
          event =>
            !searchStr ||
            event.name.toLowerCase().includes(searchStr.toLowerCase())
        )
        .sort(Event.sortByDate),
    [rawEvents, searchStr, filters]
  );

  if (!rawEvents) {
    return notFoundError();
  }

  return (
    <Page
      title={`${year} Events`}
      metaDescription={`List of events for the ${year} FIRST Robotics Competition.`}
      isLoading={eventsFetchStatus === "fetching"}
      refreshFunction={refetchEvents}
    >
      <Typography variant="h4" gutterBottom>
        {year} <i>FIRST</i> Robotics Competition Events
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={2}>
          <EventYearPicker selectedYear={year} />
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <EventListSearchCard events={rawEvents} />
          <Typography variant="subtitle1">{events.count()} results</Typography>
          <GroupedEventList events={events} />
        </Grid>
      </Grid>
    </Page>
  );
};

Events.getInitialProps = async ({ reduxStore, query }) => {
  let year = 2020; // TODO: pull this from the /status endpoint
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
      events: !eventsFetchInitial,
    },
  };
};

Events.propTypes = {
  year: PropTypes.number,
  refetchOnLoad: PropTypes.object,
};

export default Events;
