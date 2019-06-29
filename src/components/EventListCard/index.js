import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EventListItem from "./EventListItem";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(1),
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
  },
}));

const EventListCard = ({ events, label }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.card}>
      {label && (
        <>
          <div className={classes.header}>
            <Typography variant="h6">{label}</Typography>
            <Typography variant="caption">{events.length} Events</Typography>
          </div>
          <Divider />
        </>
      )}
      {events.map(event => (
        <EventListItem key={event.key} event={event} />
      ))}
    </Paper>
  );
};

EventListCard.propTypes = {
  events: PropTypes.object.isRequired,
  label: PropTypes.string,
};

export default React.memo(EventListCard);
