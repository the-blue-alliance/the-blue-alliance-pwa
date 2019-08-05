import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles/index";
import BracketContext from "./BracketContext";
import PlayoffMatchup from "./PlayoffMatchup";
import PlayoffFinalsMatchup from "./PlayoffFinalsMatchup";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  round: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    flexGrow: 1,
    maxWidth: 100,
  },
}));

const computeBracketInfo = (alliances, matches, playoffType) => {
  let allianceTeamKeys = null;
  const teamAllianceMap = {};
  if (alliances) {
    allianceTeamKeys = {};
    alliances.forEach((a, i) => {
      allianceTeamKeys[i] = a.get("picks");
      // Add in backup if it exists
      const backup = a.getIn(["backup", "in"]);
      if (backup) {
        allianceTeamKeys[i] = allianceTeamKeys[i].push(backup);
      }
      // Add to team-alliance map
      allianceTeamKeys[i].forEach(teamKey => {
        teamAllianceMap[teamKey] = i;
      });
    });
  }

  let winStats = null;
  if (matches) {
    winStats = {};
    matches.forEach(m => {
      if (!winStats[m.comp_level]) {
        winStats[m.comp_level] = {};
      }
      if (!winStats[m.comp_level][m.set_number]) {
        winStats[m.comp_level][m.set_number] = {
          redAllianceId:
            teamAllianceMap[m.getIn(["alliances", "red", "team_keys", 0])],
          blueAllianceId:
            teamAllianceMap[m.getIn(["alliances", "blue", "team_keys", 0])],
          redWins: 0,
          blueWins: 0,
          winner: null,
        };
      }
      if (m.winning_alliance === "red") {
        winStats[m.comp_level][m.set_number].redWins += 1;
      }
      if (m.winning_alliance === "blue") {
        winStats[m.comp_level][m.set_number].blueWins += 1;
      }

      const numToWin = playoffType === 6 ? 3 : 2;
      if (winStats[m.comp_level][m.set_number].redWins === numToWin) {
        winStats[m.comp_level][m.set_number].winner = "red";
      }
      if (winStats[m.comp_level][m.set_number].blueWins === numToWin) {
        winStats[m.comp_level][m.set_number].winner = "blue";
      }
    });
  }

  return [winStats, allianceTeamKeys];
};

const EventPlayoffBracket = ({
  playoffMatches,
  alliances,
  playoffType,
  eventKey,
}) => {
  const classes = useStyles();
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [winStats, allianceTeamKeys] = React.useMemo(
    () => computeBracketInfo(alliances, playoffMatches, playoffType),
    [alliances, playoffMatches, playoffType]
  );

  // Determine what parts of the bracket to show
  let hasQf = true;
  let hasSf = true;
  if (playoffType === 4) {
    hasQf = false;
    hasSf = false;
  }

  return (
    <BracketContext.Provider
      value={{
        eventKey,
        winStats,
        selectedSeed,
        setSelectedSeed,
        allianceTeamKeys,
      }}
    >
      <div className={classes.container}>
        {winStats && winStats.qf && hasQf && (
          <div className={classes.round}>
            <PlayoffMatchup compLevel="qf" setNumber={1} />
            <PlayoffMatchup compLevel="qf" setNumber={2} />
          </div>
        )}
        {winStats && winStats.sf && hasSf && (
          <div className={classes.round}>
            <PlayoffMatchup compLevel="sf" setNumber={1} />
          </div>
        )}
        <div className={classes.round}>
          <PlayoffFinalsMatchup />
        </div>
        {winStats && winStats.sf && hasSf && (
          <div className={classes.round}>
            <PlayoffMatchup compLevel="sf" setNumber={2} rightSide />
          </div>
        )}
        {winStats && winStats.qf && hasQf && (
          <div className={classes.round}>
            <PlayoffMatchup compLevel="qf" setNumber={3} rightSide />
            <PlayoffMatchup compLevel="qf" setNumber={4} rightSide />
          </div>
        )}
      </div>
    </BracketContext.Provider>
  );
};

EventPlayoffBracket.propTypes = {
  playoffMatches: PropTypes.object.isRequired,
  alliances: PropTypes.object.isRequired,
  eventKey: PropTypes.string.isRequired,
  playoffType: PropTypes.number,
};

export default React.memo(EventPlayoffBracket);
