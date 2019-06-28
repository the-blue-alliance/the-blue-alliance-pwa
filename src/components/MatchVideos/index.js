import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles/index";

const useStyles = makeStyles(theme => ({
  embedContainer: {
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    overflow: "hidden",
    maxWidth: "100%",
    marginBottom: theme.spacing(2),
  },
  embedIframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const MatchVideos = ({ match, event }) => {
  const classes = useStyles();
  const youtubeSearchLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${match.getShortName()} ${event.year} ${event.name}`
  )}`;
  return (
    <div>
      {match.videos.map(video => {
        return (
          <div className={classes.embedContainer} key={video.get("key")}>
            <iframe
              title="Match Video"
              className={classes.embedIframe}
              src={`https://www.youtube.com/embed/${video.get("key")}`}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        );
      })}
      {event != null && (
        <h3>
          <Button variant="outlined" color="primary" className={classes.button}>
            Add videos
          </Button>
          <Button
            variant="outlined"
            className={classes.button}
            href={youtubeSearchLink}
            target="_blank"
          >
            Search on YouTube
          </Button>
        </h3>
      )}
    </div>
  );
};

MatchVideos.propTypes = {
  match: PropTypes.object.isRequired,
  event: PropTypes.object,
};

export default React.memo(MatchVideos);
