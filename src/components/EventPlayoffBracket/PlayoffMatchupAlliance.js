import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles/index";
import Tooltip from "@material-ui/core/Tooltip";
import BracketContext from "./BracketContext";
import Link from "../Link";

const useStyles = makeStyles(theme => ({
  alliance: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.spacing(0.5),
    boxShadow: theme.shadows[1],
    overflow: "hidden",
  },
  selected: {
    boxShadow: theme.shadows[6],
  },
  notSelected: {
    opacity: 0.3,
  },
  red: {
    flexDirection: "column-reverse",
    marginTop: theme.spacing(1),
  },
  blue: {
    marginBottom: theme.spacing(1),
  },
  winsContainer: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.25),
  },
  redWins: {
    backgroundColor: theme.palette.type === "light" ? "#FFDDDD" : "#802020",
  },
  blueWins: {
    backgroundColor: theme.palette.type === "light" ? "#DDDDFF" : "#202080",
  },
  winner: {
    fontWeight: "bold",
  },
  hasMedal: {
    padding: theme.spacing(1),
  },
  seed: {
    flex: 1,
    textAlign: "left",
    fontSize: 12,
    paddingLeft: theme.spacing(0.5),
  },
  medal: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: theme.spacing(0.5),
  },
  medalIcon: {
    height: 18,
  },
  spaceRight: {
    marginRight: theme.spacing(1),
  },
  spaceLeft: {
    marginLeft: theme.spacing(1),
  },
  teamContainer: {
    fontSize: 14,
    padding: theme.spacing(0.5),
  },
}));

const PlayoffMatchupAlliance = ({
  eventKey,
  color,
  seed,
  wins,
  isWinner,
  spaceLeft,
  spaceRight,
  isFinals,
}) => {
  const classes = useStyles();
  const isRed = color === "red";
  return (
    <BracketContext.Consumer>
      {state => {
        const { selectedSeed, setSelectedSeed, allianceTeamKeys } = state;
        return (
          <div
            className={clsx({
              [classes.alliance]: true,
              [classes.red]: isRed,
              [classes.blue]: !isRed,
              [classes.selected]: selectedSeed === seed,
              [classes.notSelected]:
                selectedSeed !== null && selectedSeed !== seed,
              [classes.spaceLeft]: spaceLeft,
              [classes.spaceRight]: spaceRight,
            })}
            onMouseEnter={() => setSelectedSeed(seed, state)}
            onMouseLeave={() => setSelectedSeed(null, state)}
          >
            <div
              className={clsx({
                [classes.winsContainer]: true,
                [isRed ? classes.redWins : classes.blueWins]: true,
                [classes.winner]: isWinner,
                [classes.hasMedal]: isFinals,
              })}
            >
              <div className={classes.seed}>{seed.toString()}.</div>
              <div>{wins}</div>
              <div className={classes.medal}>
                {isFinals && isWinner && (
                  <Tooltip title="Winner" placement="top">
                    <img
                      src="/medal-gold.svg"
                      className={classes.medalIcon}
                      alt="Gold medal"
                    />
                  </Tooltip>
                )}
                {isFinals && !isWinner && (
                  <Tooltip title="Finalist" placement="top">
                    <img
                      src="/medal-silver.svg"
                      className={classes.medalIcon}
                      alt="Silver medal"
                    />
                  </Tooltip>
                )}
              </div>
            </div>
            <div className={classes.teamContainer}>
              {allianceTeamKeys &&
                allianceTeamKeys[seed - 1] &&
                allianceTeamKeys[seed - 1].map(teamKey => (
                  <div key={teamKey}>
                    <Link
                      href={`/event?eventKey=${eventKey}&teamKey=${teamKey}`}
                      as={`/team/${teamKey.substring(3)}/${eventKey.substring(
                        0,
                        4
                      )}`}
                    >
                      {teamKey.substring(3)}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        );
      }}
    </BracketContext.Consumer>
  );
};
PlayoffMatchupAlliance.propTypes = {
  eventKey: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  seed: PropTypes.number.isRequired,
  wins: PropTypes.number.isRequired,
  isWinner: PropTypes.bool,
  spaceLeft: PropTypes.bool,
  spaceRight: PropTypes.bool,
  isFinals: PropTypes.bool,
};

export default React.memo(PlayoffMatchupAlliance);
