/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GroupedListCards from "../GroupedListCards";
import EventListItem from "../EventListItem";
import { slugify } from "../../lib/utils";

const useStyles = makeStyles(theme => ({}));

const GroupedEventList = ({ events }) => {
  const itemRenderer = React.useCallback(({ item: event, style }) => {
    return (
      <div key={event.key} style={style}>
        <EventListItem event={event} />
      </div>
    );
  }, []);

  const classes = useStyles();

  // Group official events by week/Champs
  // Group unofficial events by month
  const weekEvents = [];
  const cmpEvents = [];
  const focEvents = [];
  const unofficialEvents = [];
  events.forEach(event => {
    if (event.isCMP()) {
      cmpEvents.push(event);
    } else if (event.isFOC()) {
      focEvents.push(event);
    } else if (event.isOfficial()) {
      weekEvents.push(event);
    } else {
      unofficialEvents.push(event);
    }
  });

  const groupedOfficialEvents = [];
  // Add events by week
  const eventsByWeek = {};
  weekEvents.forEach(event => {
    const week = `Week ${event.week + 1}`;
    if (week in eventsByWeek) {
      eventsByWeek[week].push(event);
    } else {
      eventsByWeek[week] = [event];
    }
  });
  for (let week in eventsByWeek) {
    groupedOfficialEvents.push({
      key: slugify(week),
      header: week,
      items: eventsByWeek[week],
    });
  }

  // Add Championship(s)
  const eventsByCmp = {};
  cmpEvents.forEach(event => {
    let cmp = "Championship";
    if (event.year >= 2017) {
      cmp = `${event.city} Championship`;
    }
    if (cmp in eventsByCmp) {
      eventsByCmp[cmp].push(event);
    } else {
      eventsByCmp[cmp] = [event];
    }
  });
  for (let cmp in eventsByCmp) {
    groupedOfficialEvents.push({
      key: slugify(cmp),
      header: cmp,
      items: eventsByCmp[cmp],
    });
  }

  // Add FOC
  if (focEvents.length !== 0) {
    groupedOfficialEvents.push({
      key: "foc",
      header: "Festival of Champions",
      items: focEvents,
    });
  }

  const groupedUnofficialEvents = [];
  // Add unofficial events by month
  const unofficialEventsByMonth = {};
  unofficialEvents.forEach(event => {
    const month = `${event.startDateTime().toFormat("LLLL")}`;
    if (month in unofficialEventsByMonth) {
      unofficialEventsByMonth[month].push(event);
    } else {
      unofficialEventsByMonth[month] = [event];
    }
  });
  for (let month in unofficialEventsByMonth) {
    groupedUnofficialEvents.push({
      key: slugify(month),
      header: month,
      items: unofficialEventsByMonth[month],
    });
  }

  return (
    <>
      <Typography variant="h5">Offical Events</Typography>
      <GroupedListCards
        groups={groupedOfficialEvents}
        itemRenderer={itemRenderer}
        itemHeight={65}
        ssrFallbackId="official-events-list-server-fallback"
      />
      {/*
      {groupedOfficialEvents.map(group => (
        <EventListCard
          key={group.slug}
          label={group.label}
          events={group.events}
        />
      ))}
      <Typography variant="h5">Unofficial Events</Typography>
      {groupedUnofficialEvents.map(group => (
        <EventListCard
          key={group.slug}
          label={group.label}
          events={group.events}
        />
      ))}*/}
    </>
  );
};

GroupedEventList.propTypes = {
  events: PropTypes.object.isRequired,
};

export default React.memo(GroupedEventList);
