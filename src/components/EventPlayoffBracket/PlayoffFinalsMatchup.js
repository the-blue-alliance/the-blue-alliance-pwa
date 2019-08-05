import React from "react";
import { makeStyles } from "@material-ui/core/styles/index";
import BracketContext from "./BracketContext";
import PlayoffMatchupAlliance from "./PlayoffMatchupAlliance";
import Spacer from "./Spacer";

const useStyles = makeStyles(theme => ({
  centerSpacer: {
    minHeight: theme.spacing(1),
  },
}));

const PlayoffFinalsMatchup = () => {
  const classes = useStyles();
  const { eventKey, winStats } = React.useContext(BracketContext);
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
};

export default React.memo(PlayoffFinalsMatchup);
