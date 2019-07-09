import React from "react";
import PropTypes from "prop-types";
import Link from "../Link";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  tr: {
    height: 32,
  },
  th: {
    padding: "6px 2px 6px 8px",
  },
  td: {
    fontSize: 13,
    padding: "6px 2px 6px 8px",
  },
  medalIcon: {
    height: 18,
    verticalAlign: "middle",
  },
});

const EventAllianceTable = ({ eventKey, alliances }) => {
  const classes = useStyles();

  if (!alliances || alliances.size === 0) {
    return null;
  }

  const teamsPerAlliance = alliances.getIn([0, "picks"]).size;
  const yearStr = eventKey.substr(0, 4);

  return (
    <Table size="small">
      <TableHead>
        <TableRow className={classes.tr}>
          <TableCell className={classes.th}>Alliance</TableCell>
          <TableCell className={classes.th}>Status</TableCell>
          {[...Array(teamsPerAlliance).keys()].map(i => {
            if (i === 0) {
              return (
                <TableCell key={i} className={classes.th} align="right">
                  Captain
                </TableCell>
              );
            } else {
              return (
                <TableCell
                  key={i}
                  className={classes.th}
                  align="right"
                >{`Pick ${i}`}</TableCell>
              );
            }
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {alliances.map((a, i) => {
          let status;
          if (a.getIn(["status", "status"]) === "won") {
            status = (
              <Tooltip title="Winner" placement="top">
                <img
                  src="/medal-gold.svg"
                  className={classes.medalIcon}
                  alt="Gold medal"
                />
              </Tooltip>
            );
          } else if (a.getIn(["status", "level"]) === "f") {
            status = (
              <Tooltip title="Finalist" placement="top">
                <img
                  src="/medal-silver.svg"
                  className={classes.medalIcon}
                  alt="Silver medal"
                />
              </Tooltip>
            );
          } else {
            status = a.getIn(["status", "level"])
              ? a.getIn(["status", "level"]).toUpperCase()
              : "?";
          }

          return (
            <TableRow key={i} className={classes.tr}>
              <TableCell component="th" scope="row" className={classes.td}>
                {a.get("name") ? a.get("name") : `Alliance ${i + 1}`}
              </TableCell>
              <TableCell className={classes.td}>{status}</TableCell>
              {a.get("picks").map(teamKey => {
                const teamNum = teamKey.substr(3);
                let backupTeam = null;
                if (a.getIn(["backup", "out"]) === teamKey) {
                  const backupTeamNum = a.getIn(["backup", "in"]).substr(3);
                  backupTeam = (
                    <React.Fragment>
                      &nbsp;(
                      <Link
                        href={`/event?eventKey=${eventKey}&teamKey=${teamKey}`}
                        as={`/team/${teamKey.substring(3)}/${yearStr}`}
                      >
                        <Tooltip
                          title={`This team was called as a backup for Team ${teamNum}`}
                          placement="top"
                        >
                          <span>{backupTeamNum}</span>
                        </Tooltip>
                      </Link>
                      )
                    </React.Fragment>
                  );
                }
                return (
                  <TableCell key={teamKey} className={classes.td} align="right">
                    <Link
                      href={`/event?eventKey=${eventKey}&teamKey=${teamKey}`}
                      as={`/team/${teamKey.substring(3)}/${yearStr}`}
                    >
                      {teamNum}
                    </Link>
                    {backupTeam}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

EventAllianceTable.propTypes = {
  eventKey: PropTypes.string.isRequired,
  alliances: PropTypes.object.isRequired,
};

export default React.memo(EventAllianceTable);
