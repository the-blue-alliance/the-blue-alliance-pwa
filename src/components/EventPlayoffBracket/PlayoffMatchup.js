import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles/index";
import BracketContext from "./BracketContext";
import PlayoffMatchupAlliance from "./PlayoffMatchupAlliance";
import Spacer from "./Spacer";

const useStyles = makeStyles(theme => ({
  centerSpacer: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-end",
    flexGrow: 1,
    minHeight: theme.spacing(1),
  },
  centerSpacerRight: {
    flexDirection: "row-reverse",
  },
  join: {
    display: "flex",
    alignItems: "flex-start",
  },
  joinLeft: {
    borderLeft: "2px solid",
  },
  joinRight: {
    borderRight: "2px solid",
  },
  joinBottom: {
    alignItems: "flex-end",
  },
  joinBar: {
    borderBottom: "2px solid",
    width: theme.spacing(2),
    margin: `${theme.spacing(1)}px 0`,
  },
  redWin: {
    borderColor: "red",
  },
  blueWin: {
    borderColor: "blue",
  },
  notSelected: {
    opacity: 0.3,
  },
}));

const PlayoffMatchup = ({ compLevel, setNumber, rightSide }) => {
  const classes = useStyles();
  const { eventKey, selectedSeed, winStats } = React.useContext(BracketContext);
  let redSeed = "?";
  let redWins = "?";
  let blueSeed = "?";
  let blueWins = "?";
  let winner = null;
  if (winStats) {
    redSeed = winStats[compLevel][setNumber].redAllianceId + 1;
    redWins = winStats[compLevel][setNumber].redWins;
    blueSeed = winStats[compLevel][setNumber].blueAllianceId + 1;
    blueWins = winStats[compLevel][setNumber].blueWins;
    winner = winStats[compLevel][setNumber].winner;
  }

  let winnerSeed = null;
  if (winner === "red") {
    winnerSeed = redSeed;
  } else if (winner === "blue") {
    winnerSeed = blueSeed;
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
        spaceLeft={rightSide}
        spaceRight={!rightSide}
      />
      <div
        className={clsx({
          [classes.centerSpacer]: true,
          [classes.centerSpacerRight]: rightSide,
        })}
      >
        <div
          className={clsx({
            [classes.join]: true,
            [classes.joinLeft]: !rightSide,
            [classes.joinRight]: rightSide,
            [classes.joinBottom]: rightSide && compLevel === "sf",
            [classes.redWin]: winner === "red",
            [classes.blueWin]: winner === "blue",
            [classes.notSelected]:
              selectedSeed !== null && winnerSeed !== selectedSeed,
          })}
        >
          <div
            className={clsx({
              [classes.joinBar]: true,
              [classes.redWin]: winner === "red",
              [classes.blueWin]: winner === "blue",
              [classes.notSelected]:
                selectedSeed !== null && winnerSeed !== selectedSeed,
            })}
          />
        </div>
      </div>
      <PlayoffMatchupAlliance
        eventKey={eventKey}
        color="blue"
        seed={blueSeed}
        wins={blueWins}
        isWinner={winner === "blue"}
        spaceLeft={rightSide}
        spaceRight={!rightSide}
      />
      <Spacer />
    </>
  );
};

PlayoffMatchup.propTypes = {
  compLevel: PropTypes.string.isRequired,
  setNumber: PropTypes.number.isRequired,
  rightSide: PropTypes.bool,
};

export default React.memo(PlayoffMatchup);
