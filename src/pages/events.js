import React from "react";
import PropTypes from "prop-types";
import {
  getYearEventsFetchStatus,
  getYearEvents,
} from "../selectors/EventSelectors";
import { fetchYearEvents } from "../actions";
import useData from "../lib/useData";
import notFoundError from "../lib/notFoundError";
import Page from "../components/Page";
import Link from "../components/Link";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EventListSearchCard from "../components/EventListSearchCard";

const useStyles = makeStyles({
  sideNav: {},
});

const Events = ({ year, refetchOnLoad }) => {
  const classes = useStyles();
  const [events, eventsFetchStatus, refetchEvents] = useData(
    state => getYearEventsFetchStatus(state, year),
    state => getYearEvents(state, year),
    fetchYearEvents(year),
    refetchOnLoad.events
  );

  // Event filters
  const [searchStr, setSearchStr] = React.useState("");
  const filteredEvents = React.useMemo(
    () =>
      events.filter(event =>
        event.name.toLowerCase().includes(searchStr.toLowerCase())
      ),
    [events, searchStr]
  );
  const handleChange = e => {
    setSearchStr(e.target.value);
  };

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
          <EventListSearchCard
            searchStr={searchStr}
            handleChange={handleChange}
          />
          <Typography variant="subtitle1">
            {filteredEvents.count()} results
          </Typography>
          {filteredEvents.map(event => (
            <div key={event.key}>
              <Link
                href={`/event?eventKey=${event.key}`}
                as={`/event/${event.key}`}
              >
                {`${event.year} ${event.safeShortName()}`}
              </Link>
            </div>
          ))}
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
