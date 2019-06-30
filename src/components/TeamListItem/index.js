import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    position: "relative",
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
  nameLoationContainer: {
    display: "flex",
    flexGrow: 1,
    width: "55%",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const TeamListItem = ({ team, ...restProps }) => {
  const classes = useStyles();

  return (
    <div {...restProps}>
      <div className={classes.root}>
        <div className={classes.nameLoationContainer}>
          <Typography variant="subtitle1" noWrap>
            <Link href={`/team?teamKey=${team.key}`} as={`/team/${team.key}`}>
              <span className={classes.name}>
                {team.team_number} | {team.nickname}
              </span>
            </Link>
          </Typography>
          <Typography variant="body2" noWrap>
            {team.location}
          </Typography>
        </div>
      </div>
      <Divider />
    </div>
  );
};

TeamListItem.propTypes = {
  team: PropTypes.object.isRequired,
};

export default React.memo(TeamListItem);
