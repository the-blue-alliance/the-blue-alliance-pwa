import React from "react";
import PropTypes from "prop-types";
import Page from "../components/Page";
import NoSsr from "@material-ui/core/NoSsr";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import notFoundError from "../lib/notFoundError";
import WindowScrollerList from "../components/WindowScrollerList";
import TeamListItem from "../components/TeamListItem";

const Teams = ({ page, teams }) => {
  const rowRenderer = React.useCallback(
    ({ index, style }) => {
      const team = teams[index];
      return <TeamListItem key={team.key} team={team} style={style} />;
    },
    [teams]
  );

  if (!teams) {
    return notFoundError();
  }

  let minTeam = 1;
  if (page > 0) {
    minTeam = 1000 * page;
  }
  const maxTeam = 1000 * page + 999;
  const teamsRange = `${minTeam}-${maxTeam}`;

  return (
    <Page
      title="Teams"
      metaDescription="List of teams in the FIRST Robotics Competition."
    >
      <Typography variant="h4">Teams</Typography>
      <Typography variant="h5">{teamsRange}</Typography>
      <Paper>
        <NoSsr
          fallback={
            !process.browser &&
            teams
              .slice(minTeam - 1, maxTeam)
              .map(team => <TeamListItem key={team.key} team={team} />)
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

Teams.getInitialProps = async ({ query }) => {
  let pageNum = 0;
  const maxPage = 7; // TODO: don't hardcode

  // Temp fake teams
  const teamNumbers = Array.apply(null, { length: 7999 }).map(
    Number.call,
    Number
  );
  let teams = teamNumbers.map(number => ({
    key: `frc${number + 1}`,
    team_number: number + 1,
    nickname: "Test",
    location: "San Jose, CA, USA",
  }));

  // Ensure query.page is a positive integer <= maxPage
  if (query.page) {
    if (query.page.match(/^\d+$/)) {
      // convert 1-index to 0-index
      pageNum = parseInt(query.page, 10) - 1;
      if (pageNum <= 0 || pageNum > maxPage) {
        teams = null;
      }
    } else {
      teams = null;
    }
  }

  return {
    page: pageNum,
    maxPage,
    teams,
  };
};

Teams.propTypes = {
  page: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  teams: PropTypes.array,
};

export default Teams;
