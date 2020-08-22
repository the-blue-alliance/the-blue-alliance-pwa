import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import Link from "../Link";
import Typography from "@material-ui/core/Typography";
import VideogameAssetRounded from "@material-ui/icons/VideogameAssetRounded";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(theme => ({
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
  asteriskText: {
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  firstLogo: {
    fontStyle: "italic",
  },
  paddingCell: {
    paddingRight: "4px",
    paddingLeft: "4px",
  },
}));

const RankingsList = ({ rankings, eventKey }) => {
  const classes = useStyles();

  //deep copies all nested arrays and maps into accessable JSON
  rankings = rankings ? JSON.parse(JSON.stringify(rankings)) : null;

  if (!rankings || !rankings["rankings"] || rankings["rankings"].length === 0) {
    return (
      <div className={classes.zeroDataContainer}>
        <VideogameAssetRounded className={classes.zeroDataIcon} />
        <Typography variant="subtitle1">No rankings found.</Typography>
      </div>
    );
  }

  const sort_categories = [],
    extra_stats = [];

  for (let sort_info in rankings["sort_order_info"])
    sort_categories.push({
      id: rankings["sort_order_info"][sort_info].name.toLowerCase(),
      display: rankings["sort_order_info"][sort_info].name,
      precision: rankings["sort_order_info"][sort_info].precision,
    });
  for (let extra_stat in rankings["extra_stats_info"])
    extra_stats.push({
      id: rankings["extra_stats_info"][extra_stat].name.toLowerCase(),
      display: rankings["extra_stats_info"][extra_stat].name + "*",
      precision: rankings["extra_stats_info"][extra_stat].precision,
    });

  const computeRankings = () => {
    const table = [];
    rankings["rankings"].forEach(team => {
      const row = [];
      row.push(<strong>{team["rank"]}</strong>);
      row.push(
        <Link
          href={`/event?eventKey=${eventKey}&teamKey=${team["team_key"].substr(
            3
          )}`}
          as={`/team/${team["team_key"].substr(3)}/${String(eventKey).slice(
            0,
            4
          )}`}
        >
          {team["team_key"].substr(3)}
        </Link>
      );
      sort_categories.forEach((cat, idx) =>
        row.push(
          cat.precision
            ? team["sort_orders"][idx].toFixed(cat.precision)
            : team["sort_orders"][idx]
        )
      );
      row.push(
        team["record"]["wins"] +
          "-" +
          team["record"]["losses"] +
          "-" +
          team["record"]["ties"],
        team["dq"],
        team["matches_played"]
      );
      extra_stats.forEach((stat, idx) =>
        row.push(
          stat.precision
            ? team["extra_stats"][idx].toFixed(stat.precision)
            : team["extra_stats"][idx]
        )
      );
      table.push(row);
    });
    return table;
  };

  const columns = new Array().concat(
    [
      { id: "rank", display: "Rank" },
      { id: "team", display: "Team" },
    ],
    sort_categories,
    [
      { id: "record", display: "Record (W-L-T)" },
      { id: "dq", display: "DQ" },
      { id: "played", display: "Played" },
    ],
    extra_stats
  );
  const table = computeRankings();

  return (
    <List component="div" disablePadding>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="Ranking Table" size="small">
          <TableHead>
            <TableRow key="header">
              {columns.map(col => {
                return (
                  <TableCell key={col.id} align={"center"} variant={"head"}>
                    {col.display}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody key="rankings_table_data">
            {table.map((row, idxr) => {
              return (
                <TableRow hover tabIndex={-1} key={idxr}>
                  {columns.map((column, idxc) => {
                    const value = table[idxr][idxc];
                    return (
                      <TableCell
                        key={idxc}
                        align={"center"}
                        size={"small"}
                        className={classes.paddingCell}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div hidden={extra_stats.length === 0}>
        <Typography
          hidden={extra_stats.length === 0}
          variant="caption"
          className={classes.asteriskText}
        >
          <span>
            *This column is calculated for your convenience by The Blue Alliance
            using data provided by
            <span className={classes.firstLogo}> FIRST </span>
            and is not official.
          </span>
        </Typography>
      </div>
    </List>
  );
};

RankingsList.propTypes = {
  rankings: PropTypes.object.isRequired,
  eventKey: PropTypes.string.isRequired,
};

export default React.memo(RankingsList);
