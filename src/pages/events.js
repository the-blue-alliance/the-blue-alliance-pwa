import React from "react";
import PropTypes from "prop-types";
import {
  getYearEventsFetchStatus,
  getYearEvents,
} from "../selectors/EventSelectors";
import { fetchYearEvents } from "../actions";
import useData from "../lib/useData";
import useSearchFocus from "../lib/useSearchFocus";
import notFoundError from "../lib/notFoundError";
import Page from "../components/Page";
import Link from "../components/Link";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from "@material-ui/icons/FilterList";
import EventFilterChip from "../components/EventFilterChip";

const useStyles = makeStyles(theme => ({
  inputCard: {
    padding: theme.spacing(1),
    position: "sticky",
    top: 56,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      top: 48,
    },
    [theme.breakpoints.up("sm")]: {
      top: 64,
    },
  },
  inputRow: {
    display: "flex",
  },
  input: {
    flex: 1,
    paddingRight: theme.spacing(1),
  },
}));

const Events = ({ year, refetchOnLoad }) => {
  const classes = useStyles();
  const [events, eventsFetchStatus, refetchEvents] = useData(
    state => getYearEventsFetchStatus(state, year),
    state => getYearEvents(state, year),
    fetchYearEvents(year),
    refetchOnLoad.events
  );

  // Event filters
  const searchRef = useSearchFocus();
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const filteredEvents = React.useMemo(
    () =>
      events.filter(event =>
        event.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [events, filter]
  );
  const handleChange = e => {
    setFilter(e.target.value);
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
          <Paper className={classes.inputCard} square>
            <div className={classes.inputRow}>
              <TextField
                className={classes.input}
                inputRef={searchRef}
                label="Search by name"
                value={filter}
                onChange={handleChange}
                margin="none"
              />
              <IconButton onClick={() => setFilterOpen(!filterOpen)}>
                <Badge badgeContent={4} color="secondary">
                  <FilterListIcon />
                </Badge>
              </IconButton>
            </div>
            <Collapse in={filterOpen}>
              <Typography variant="subtitle1">Filters</Typography>
              <EventFilterChip
                label="Regional"
                color="#fff"
                onClick={() => console.log("!")}
              />
              <EventFilterChip
                label="FIM"
                color="#3f51b5"
                onClick={() => console.log("!")}
              />
            </Collapse>
          </Paper>
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
