import React from "react";
import PropTypes from "prop-types";
import Page from "../components/Page";
import NoSsr from "@material-ui/core/NoSsr";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import WindowScrollerList from "../components/WindowScrollerList";
import TeamListItem from "../components/TeamListItem";

const teamNumbers = Array.apply(null, { length: 10000 }).map(
  Number.call,
  Number
);
const teams = teamNumbers.map(number => ({
  key: `frc${number + 1}`,
  team_number: number + 1,
  nickname: "Test",
  location: "San Jose, CA, USA",
}));

const Teams = () => {
  const rowRenderer = ({
    index,
    isScrolling,
    isVisible,
    key,
    parent,
    style,
  }) => {
    return <TeamListItem key={index} team={teams[index]} style={style} />;
  };
  return (
    <Page
      title="Teams"
      metaDescription="List of teams in the FIRST Robotics Competition."
    >
      <Typography variant="h4">Teams</Typography>
      <Paper>
        <NoSsr
          fallback={
            // Compute fallback on server only
            !process.browser &&
            teams.map(team => <TeamListItem key={team} team={team} />)
          }
        >
          <WindowScrollerList
            rowCount={teams.length}
            rowHeight={65}
            rowRenderer={rowRenderer}
          />
        </NoSsr>
      </Paper>
    </Page>
  );
};

Teams.propTypes = {};

export default Teams;
