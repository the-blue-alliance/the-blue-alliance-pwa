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
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EventListSearchCard from "../components/EventListSearchCard";
import EventListCard from "../components/EventListCard";

const useStyles = makeStyles({
  sideNav: {},
});

const Events = ({ year, refetchOnLoad }) => {
  const classes = useStyles();
  const [events, eventsFetchStatus, refetchEvents] = useData(
    state => getYearEventsFetchStatus(state, year),
    state => getYearEvents(state, year),
    React.useMemo(() => fetchYearEvents(year), [year]),
    refetchOnLoad.events
  );

  // Apply filters from URL query
  const searchStr = useQueryParam("search")[0];
  const filters = useQueryParamSet("filters")[0];
  const filteredEvents = React.useMemo(
    () =>
      events
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
        ),
    [events, searchStr, filters]
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
      <Typography variant="h4" gutterBottom>
        {year} <i>FIRST</i> Robotics Competition Events
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={2}>
          <div className={classes.sideNav}>TODO: YEAR PICKER & SECTIONS</div>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <EventListSearchCard events={events} />
          <Typography variant="subtitle1">
            {filteredEvents.count()} results
          </Typography>
          <EventListCard events={filteredEvents} />
        </Grid>
      </Grid>
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
      events: !eventsFetchInitial,
    },
  };
};

Events.propTypes = {
  year: PropTypes.number,
  refetchOnLoad: PropTypes.object,
};

export default Events;
