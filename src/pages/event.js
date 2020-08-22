import React from "react";
import PropTypes from "prop-types";
import { getEventFetchStatus, getEvent } from "../selectors/EventSelectors";
import {
  getEventMatchesFetchStatus,
  getEventMatches,
} from "../selectors/MatchSelectors";
import {
  getEventAlliancesFetchStatus,
  getEventAlliances,
} from "../selectors/AllianceSelectors";
import {
  getEventRankingsFetchStatus,
  getEventRankings,
} from "../selectors/RankingSelectors";
import {
  fetchEvent,
  fetchEventMatches,
  fetchEventAlliances,
  fetchEventRankings,
} from "../actions";
import useData from "../lib/useData";
import notFoundError from "../lib/notFoundError";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Page from "../components/Page";
import MatchList from "../components/MatchList";
import EventAllianceTable from "../components/EventAllianceTable";
import EventPlayoffBracket from "../components/EventPlayoffBracket";
import EventPageDialog from "../components/EventPageDialog";
import PageTabs from "../components/PageTabs";
import StickySectionHeader from "../components/StickySectionHeader";
import Link from "../components/Link";
import { makeStyles } from "@material-ui/core/styles/index";
import EventIcon from "@material-ui/icons/Event";
import LinkIcon from "@material-ui/icons/Link";
import PlaceIcon from "@material-ui/icons/Place";
import RankingsList from "../components/RankingsList";

const useStyles = makeStyles(theme => ({
  eventInfoContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  eventInfo: {
    fontSize: 14,
  },
  icon: {
    top: "0.125em",
    position: "relative",
    marginRight: theme.spacing(1),
  },
  cardTitle: {
    fontWeight: 400,
  },
  sectionCard: {
    marginBottom: theme.spacing(2),
  },
}));

const Event = ({ eventKey, refetchOnLoad }) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  function handleTabChange(event, newIndex) {
    setTabIndex(newIndex);
  }

  const [event, eventFetchStatus, refetchEvent] = useData(
    state => getEventFetchStatus(state, eventKey),
    state => getEvent(state, eventKey),
    React.useMemo(() => fetchEvent(eventKey), [eventKey]),
    refetchOnLoad.event
  );
  const [rankings, rankingsFetchStatus, refetchRankings] = useData(
    state => getEventRankingsFetchStatus(state, eventKey),
    state => getEventRankings(state, eventKey),
    React.useMemo(() => fetchEventRankings(eventKey), [eventKey]),
    refetchOnLoad.eventRankings
  );
  const [unsortedMatches, matchesFetchStatus, refetchMatches] = useData(
    state => getEventMatchesFetchStatus(state, eventKey),
    state => getEventMatches(state, eventKey),
    React.useMemo(() => fetchEventMatches(eventKey), [eventKey]),
    refetchOnLoad.eventMatches
  );
  const [alliances, alliancesFetchStatus, refetchAlliances] = useData(
    state => getEventAlliancesFetchStatus(state, eventKey),
    state => getEventAlliances(state, eventKey),
    React.useMemo(() => fetchEventAlliances(eventKey), [eventKey]),
    refetchOnLoad.eventMatches
  );
  const handleRefresh = React.useCallback(() => {
    refetchEvent();
    refetchMatches();
    refetchAlliances();
    refetchRankings();
  }, [refetchEvent, refetchMatches, refetchAlliances, refetchRankings]);

  // Sort matches
  const matches = React.useMemo(
    () =>
      unsortedMatches.sort((a, b) => {
        return a.getNaturalOrder() - b.getNaturalOrder();
      }),
    [unsortedMatches]
  );

  // Quals matches
  const qualsMatches = React.useMemo(
    () => matches.filter(m => m.get("comp_level") === "qm"),
    [matches]
  );
  // Playoff matches
  const playoffMatches = React.useMemo(
    () => matches.filter(m => m.get("comp_level") !== "qm"),
    [matches]
  );

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
        eventFetchStatus === "fetching" ||
        matchesFetchStatus === "fetching" ||
        alliancesFetchStatus === "fetching" ||
        rankingsFetchStatus === "fetching"
      }
      refreshFunction={handleRefresh}
    >
      <Typography variant="h4">
        {event.name} {event.year}
      </Typography>

      <div className={classes.eventInfoContainer}>
        <Typography className={classes.eventInfo}>
          <EventIcon fontSize="inherit" className={classes.icon} />{" "}
          {event.getDateString()}
        </Typography>
        <Typography className={classes.eventInfo}>
          <PlaceIcon fontSize="inherit" className={classes.icon} />
          <Link
            href={event.gmaps_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {event.location_name}
          </Link>
          <span>{` in ${event.getCityStateCountry()}`}</span>
        </Typography>
        {event.website && (
          <Typography className={classes.eventInfo}>
            <LinkIcon fontSize="inherit" className={classes.icon} />
            <Link
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {event.website}
            </Link>
          </Typography>
        )}
      </div>

      <PageTabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Results" />
        <Tab label="Rankings" />
        <Tab label="Awards" />
        <Tab label="Teams" />
        <Tab label="Insights" />
        <Tab label="Media" />
      </PageTabs>
      <div hidden={tabIndex !== 0}>
        <Grid container>
          <Grid xs={12} sm={6} style={{ padding: 8 }} item>
            {(qualsMatches.count() > 0 || matches.count() === 0) && (
              <Paper>
                <StickySectionHeader offset={47}>
                  Qualification Results
                </StickySectionHeader>
                <MatchList matches={matches} showSubheaders={false} justQuals />
              </Paper>
            )}
            {qualsMatches.count() === 0 && playoffMatches.count() > 0 && (
              <Paper>
                <StickySectionHeader offset={47}>
                  Playoff Results
                </StickySectionHeader>
                <MatchList
                  matches={matches}
                  showSubheaders={false}
                  justPlayoff
                />
              </Paper>
            )}
          </Grid>
          {((alliances && alliances.size > 0) ||
            (playoffMatches.count() > 0 && qualsMatches.count() > 0)) && (
            <Grid xs={12} sm={6} style={{ padding: 8 }} item>
              {alliances && alliances.size > 0 && (
                <Paper className={classes.sectionCard}>
                  <StickySectionHeader offset={47}>
                    Alliances
                  </StickySectionHeader>
                  <EventAllianceTable
                    eventKey={eventKey}
                    alliances={alliances}
                  />
                </Paper>
              )}
              {playoffMatches.count() > 0 && qualsMatches.count() > 0 && (
                <Paper className={classes.sectionCard}>
                  <StickySectionHeader offset={47}>
                    Playoff Results
                  </StickySectionHeader>
                  <MatchList matches={matches} justPlayoff />
                </Paper>
              )}
              {alliances && alliances.size > 0 && playoffMatches.count() > 0 && (
                <Paper className={classes.sectionCard}>
                  <StickySectionHeader offset={47}>
                    Playoff Bracket
                  </StickySectionHeader>
                  <EventPlayoffBracket
                    eventKey={eventKey}
                    alliances={alliances}
                    playoffMatches={playoffMatches}
                    playoffType={event.playoff_type}
                  />
                </Paper>
              )}
            </Grid>
          )}
        </Grid>
      </div>
      <div hidden={tabIndex !== 1}>
        <Paper>
          <RankingsList rankings={rankings} eventKey={eventKey} />
        </Paper>
      </div>
      <EventPageDialog eventKey={eventKey ? eventKey : {}} />
      {event.structuredData()}
    </Page>
  );
};

Event.getInitialProps = async ({ reduxStore, query }) => {
  const eventKey = query.eventKey;
  const state = reduxStore.getState();

  const eventFetchInitial = getEventFetchStatus(state, eventKey) !== "success";
  const eventMatchesFetchInitial =
    getEventMatchesFetchStatus(state, eventKey) !== "success";
  const eventAlliancesFetchInitial =
    getEventAlliancesFetchStatus(state, eventKey) !== "success";
  const eventRankingsFetchInitial =
    getEventRankingsFetchStatus(state, eventKey) !== "success";

  const fetchPromises = [];
  if (eventFetchInitial) {
    fetchPromises.push(reduxStore.dispatch(fetchEvent(eventKey)));
  }
  if (eventMatchesFetchInitial) {
    fetchPromises.push(reduxStore.dispatch(fetchEventMatches(eventKey)));
  }
  if (eventAlliancesFetchInitial) {
    fetchPromises.push(reduxStore.dispatch(fetchEventAlliances(eventKey)));
  }
  if (eventRankingsFetchInitial) {
    fetchPromises.push(reduxStore.dispatch(fetchEventRankings(eventKey)));
  }
  await Promise.all(fetchPromises);

  return {
    eventKey,
    refetchOnLoad: {
      event: !eventFetchInitial,
      eventMatches: !eventMatchesFetchInitial,
      eventAlliances: !eventAlliancesFetchInitial,
      eventRankings: !eventRankingsFetchInitial,
    },
  };
};

Event.propTypes = {
  eventKey: PropTypes.string,
  refetchOnLoad: PropTypes.object,
};

export default Event;
