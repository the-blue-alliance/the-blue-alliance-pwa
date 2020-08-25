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

  if (
    !rankings ||
    !rankings.get("rankings") ||
    rankings.get("rankings").size === 0
  ) {
    return (
      <div className={classes.zeroDataContainer}>
        <VideogameAssetRounded className={classes.zeroDataIcon} />
        <Typography variant="subtitle1">No rankings found.</Typography>
      </div>
    );
  }

  const sort_categories = [],
    extra_stats = [];

  rankings.get("sort_order_info").forEach(sortOrder =>
    sort_categories.push({
      id: sortOrder.get("name").toLowerCase(),
      display: sortOrder.get("name"),
      precision: sortOrder.get("precision"),
    })
  );
  rankings.get("extra_stats_info").forEach(extraStat =>
    extra_stats.push({
      id: extraStat.get("name").toLowerCase(),
      display: extraStat.get("name") + "*",
      precision: extraStat.get("precision"),
    })
  );

  const computeRankings = () => {
    const table = [];
    rankings.get("rankings").forEach(team => {
      const row = [];
      row.push(<strong>{team.get("rank")}</strong>);
      row.push(
        <Link
          href={`/event?eventKey=${eventKey}&teamKey=${team
            .get("team_key")
            .substr(3)}`}
          as={`/team/${team.get("team_key").substr(3)}/${String(eventKey).slice(
            0,
            4
          )}`}
        >
          {team.get("team_key").substr(3)}
        </Link>
      );

      team.get("sort_orders").forEach((so, idx) => {
        if (idx < sort_categories.length)
          row.push(
            sort_categories[idx].precision
              ? so.toFixed(sort_categories[idx].precision)
              : so
          );
      });

      row.push(
        team.get("record").get("wins") +
          "-" +
          team.get("record").get("losses") +
          "-" +
          team.get("record").get("ties"),
        team.get("dq"),
        team.get("matches_played")
      );

      team.get("extra_stats").forEach((es, idx) => {
        if (idx < extra_stats.length)
          row.push(
            extra_stats[idx].precision
              ? es.toFixed(extra_stats[idx].precision)
              : es
          );
      });

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
    ),
    table = computeRankings();

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
