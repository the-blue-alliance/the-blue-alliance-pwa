import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import VideogameAssetRounded from "@material-ui/icons/VideogameAssetRounded";
import Match from "../../database/Match";
import MatchRow, { MatchListItemHeader } from "../MatchRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  subHeader: {
    height: "32px",
    lineHeight: "32px",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  zeroDataContainer: {
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  zeroDataIcon: {
    width: 40,
    height: 40,
    margin: "0 auto",
  },
  zeroDataSpinner: {
    margin: "0 auto",
  },
}));

const MatchList = ({
  matches,
  selectedTeamKey,
  showSubheaders = true,
  justQuals,
  justPlayoff,
}) => {
  const classes = useStyles();
  if (matches.size === 0) {
    return (
      <div className={classes.zeroDataContainer}>
        <VideogameAssetRounded className={classes.zeroDataIcon} />
        <Typography variant="subtitle1">No match results</Typography>
      </div>
    );
  }
  const { headers, items } = computeGroupedMatches(
    matches,
    justQuals,
    justPlayoff
  );
  return (
    <List component="div" disablePadding>
      <MatchListItemHeader />
      {headers.map((header, headerIndex) => {
        return (
          <div key={header.key}>
            {showSubheaders && (
              <ListSubheader component="div" className={classes.subHeader}>
                <ListItemText
                  style={{ margin: 0 }}
                  primary={headers[headerIndex].text}
                />
              </ListSubheader>
            )}
            {items[header.key].map(match => {
              return (
                <MatchRow
                  key={match.key}
                  match={match}
                  selectedTeamKey={selectedTeamKey}
                />
              );
            })}
          </div>
        );
      })}
    </List>
  );
};

const computeGroupedMatches = (
  matches,
  justQuals = false,
  justPlayoff = false
) => {
  const matchesByLevel = {};
  matches.forEach(match => {
    const matchLevel = match.comp_level;
    if (matchesByLevel[matchLevel]) {
      matchesByLevel[matchLevel].push(match);
    } else {
      matchesByLevel[matchLevel] = [match];
    }
  });

  // Combine everything in display order:
  // qual, ef, qf, sf, f
  const headers = [];
  const items = {};
  if ((justQuals || !justPlayoff) && matchesByLevel["qm"]) {
    headers.push({ key: "qm", text: "Qualification Matches" });
    items["qm"] = matchesByLevel["qm"];
  }
  if (justPlayoff || !justQuals) {
    if (matchesByLevel["ef"]) {
      headers.push({ key: "ef", text: "Octo-final Matches" });
      items["ef"] = matchesByLevel["ef"];
    }
    if (matchesByLevel["qf"]) {
      headers.push({ key: "qf", text: "Quarterfinal Matches" });
      items["qf"] = matchesByLevel["qf"];
    }
    if (matchesByLevel["sf"]) {
      headers.push({ key: "sf", text: "Semifinal Matches" });
      items["sf"] = matchesByLevel["sf"];
    }
    if (matchesByLevel["f"]) {
      headers.push({ key: "f", text: "Finals Matches" });
      items["f"] = matchesByLevel["f"];
    }
  }
  return { headers, items };
};

MatchList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.instanceOf(Match)).isRequired,
  selectedTeamKey: PropTypes.string,
  showSubheaders: PropTypes.bool,
  justQuals: PropTypes.bool,
  justPlayoff: PropTypes.bool,
};

export default React.memo(MatchList);
