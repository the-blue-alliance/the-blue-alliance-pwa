import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles/index";
import BracketContext from "./BracketContext";
import PlayoffMatchupAlliance from "./PlayoffMatchupAlliance";
import Spacer from "./Spacer";

const useStyles = makeStyles(theme => ({
  centerSpacer: {
    minHeight: theme.spacing(1),
  },
}));

const PlayoffFinalsMatchup = ({ eventKey }) => {
  const classes = useStyles();

  return (
    <BracketContext.Consumer>
      {({ winStats }) => {
        let redSeed = "?";
        let redWins = "?";
        let blueSeed = "?";
        let blueWins = "?";
        let winner = null;
        if (winStats) {
          redSeed = winStats.f[1].redAllianceId + 1;
          redWins = winStats.f[1].redWins;
          blueSeed = winStats.f[1].blueAllianceId + 1;
          blueWins = winStats.f[1].blueWins;
          winner = winStats.f[1].winner;
        }
        return (
          <>
            <Spacer />
            <PlayoffMatchupAlliance
              eventKey={eventKey}
              color="red"
              seed={redSeed}
              wins={redWins}
              isWinner={winner === "red"}
              isFinals
            />
            <div className={classes.centerSpacer} />
            <PlayoffMatchupAlliance
              eventKey={eventKey}
              color="blue"
              seed={blueSeed}
              wins={blueWins}
              isWinner={winner === "blue"}
              isFinals
            />
            <Spacer />
          </>
        );
      }}
    </BracketContext.Consumer>
  );
};

PlayoffFinalsMatchup.propTypes = {
  eventKey: PropTypes.string.isRequired,
};

export default React.memo(PlayoffFinalsMatchup);
