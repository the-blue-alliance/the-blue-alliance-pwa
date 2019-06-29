import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import EventListItem from "./EventListItem";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(1),
  },
}));

const EventListCard = ({ events }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.card}>
      {events.map(event => (
        <EventListItem key={event.key} event={event} />
      ))}
    </Paper>
  );
};

EventListCard.propTypes = {
  events: PropTypes.object.isRequired,
};

export default React.memo(EventListCard);
