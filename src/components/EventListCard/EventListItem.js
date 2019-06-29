import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Link from "../Link";
import green from "@material-ui/core/colors/green";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";

import Event from "../../database/Event";
import districtColors from "../../constants/DistrictColors";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    position: "relative",
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
  nameLoationContainer: {
    display: "flex",
    flexGrow: 1,
    width: "55%",
    justifyContent: "center",
    flexDirection: "column",
  },
  name: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inline",
    },
  },
  nameMobile: {
    display: "inline",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  dateContianer: {
    display: "flex",
    flexGrow: 1,
    width: "30%",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  districtIndicator: {
    position: "absolute",
    top: theme.spacing(0.5),
    left: theme.spacing(0.5),
    bottom: theme.spacing(0.5),
    width: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
  },
  eventLiveIndicator: {
    position: "absolute",
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
    bottom: theme.spacing(0.5),
    width: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    backgroundColor: green[500],
  },
  webcastButtonContainer: {
    width: 48,
  },
}));

const EventListItem = ({ event }) => {
  const classes = useStyles();

  const webcastStatus = "online"; // Temp use data from Firebase
  let webcastButton = null;
  if (event.webcasts.size > 0) {
    if (event.isNow()) {
      webcastButton = (
        <Tooltip
          title={webcastStatus === "online" ? "Watch Now" : "Webcast Offline"}
          placement="right"
        >
          <IconButton
            className={
              webcastStatus === "online" ? classes.webcastOnlineButton : null
            }
            component="a"
            href={`https://www.thebluealliance.com/watch/${event.key}`}
            target="_blank"
          >
            {webcastStatus === "offline" ? (
              <VideocamOffIcon />
            ) : (
              <VideocamIcon />
            )}
          </IconButton>
        </Tooltip>
      );
    } else {
      webcastButton = (
        <Tooltip title="Webcast Offline" placement="right">
          <div>
            <IconButton color="default" disabled>
              <VideocamOffIcon />
            </IconButton>
          </div>
        </Tooltip>
      );
    }
  }

  return (
    <>
      <div className={classes.root}>
        {event.district && (
          <div
            className={classes.districtIndicator}
            style={{
              backgroundColor:
                districtColors[event.district.get("abbreviation")],
            }}
          />
        )}

        <div className={classes.nameLoationContainer}>
          <Typography variant="subtitle1" noWrap>
            <Link
              href={`/event?eventKey=${event.key}`}
              as={`/event/${event.key}`}
            >
              <span className={classes.name}>{event.name}</span>
              <span className={classes.nameMobile}>
                {event.district &&
                  `[${event.district.get("abbreviation").toUpperCase()}]`}{" "}
                {event.safeShortName()}
              </span>
            </Link>
          </Typography>
          <Typography variant="body2" noWrap>
            {event.getCityStateCountry()}
          </Typography>
        </div>

        <div className={classes.dateContianer}>
          <Typography variant="body2">{event.getDateString()}</Typography>
        </div>

        <div className={classes.webcastButtonContainer}>{webcastButton}</div>

        {event.isNow() && <div className={classes.eventLiveIndicator} />}
      </div>
      <Divider />
    </>
  );
};

EventListItem.propTypes = {
  event: PropTypes.instanceOf(Event).isRequired,
};

export default React.memo(EventListItem);
