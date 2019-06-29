/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EventListCard from "../EventListCard";
import { slugify } from "../../lib/utils";

const useStyles = makeStyles(theme => ({}));

const GroupedEventList = ({ events }) => {
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
      label: week,
      slug: slugify(week),
      events: eventsByWeek[week],
      isOfficial: true,
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
      label: cmp,
      slug: slugify(cmp),
      events: eventsByCmp[cmp],
      isOfficial: true,
    });
  }

  // Add FOC
  if (focEvents.length !== 0) {
    groupedOfficialEvents.push({
      label: "Festival of Champions",
      slug: "foc",
      events: focEvents,
      isOfficial: true,
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
      label: month,
      slug: slugify(month),
      events: unofficialEventsByMonth[month],
      isOfficial: false,
    });
  }

  return (
    <>
      <Typography variant="h5">Offical Events</Typography>
      {groupedOfficialEvents.map(group => (
        <EventListCard label={group.label} events={group.events} />
      ))}
      <Typography variant="h5">Unofficial Events</Typography>
      {groupedUnofficialEvents.map(group => (
        <EventListCard label={group.label} events={group.events} />
      ))}
    </>
  );
};

GroupedEventList.propTypes = {
  events: PropTypes.object.isRequired,
};

export default React.memo(GroupedEventList);
