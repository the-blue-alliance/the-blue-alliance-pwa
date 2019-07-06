import React from "react";
import PropTypes from "prop-types";
import Page from "../components/Page";
import Typography from "@material-ui/core/Typography";
import notFoundError from "../lib/notFoundError";
import GroupedListCards from "../components/GroupedListCards";
import TeamListItem from "../components/TeamListItem";

const Teams = ({ page, maxPage, teams }) => {
  const itemRenderer = React.useCallback(({ item: team, style }) => {
    return (
      <div key={team.key} style={style}>
        <TeamListItem team={team} />
      </div>
    );
  }, []);

  if (!teams) {
    return notFoundError();
  }

  // Group teams
  const groups = [];
  teams.forEach(team => {
    const group = Math.floor(team.team_number / 100);
    if (group < groups.length) {
      groups[group].items.push(team);
    } else {
      let header;
      if (group == 0) {
        header = "1-99";
      } else {
        header = `${group * 100}'s`;
      }
      groups[group] = {
        key: group, // TODO: Make it identifiable
        header,
        items: [team],
      };
    }
  });

  return (
    <Page
      title="Teams"
      metaDescription={`List of teams in the FIRST Robotics Competition. (Page ${page +
        1} of ${maxPage + 1})`}
      additionalMetas={
        <>
          {page > 0 && (
            <link
              rel="prev"
              href={page === 1 ? "/teams" : `/teams?page=${page}`}
            />
          )}
          {page < maxPage && (
            <link rel="next" href={`/teams?page=${page + 2}`} />
          )}
        </>
      }
    >
      <Typography variant="h4">Teams</Typography>
      <GroupedListCards
        groups={groups}
        itemRenderer={itemRenderer}
        itemHeight={65}
        ssrFallbackId="team-list-server-fallback"
        ssrGroup={page}
      />
    </Page>
  );
};

Teams.getInitialProps = async ({ query }) => {
  let pageNum = 0;
  const maxPage = 70; // TODO: don't hardcode

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
