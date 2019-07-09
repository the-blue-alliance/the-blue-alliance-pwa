import React from "react";
import PropTypes from "prop-types";
import {
  getAllTeamsFetchStatus,
  getAllTeams,
} from "../selectors/TeamSelectors";
import { fetchAllTeams } from "../actions";
import useData from "../lib/useData";
import Page from "../components/Page";
import Typography from "@material-ui/core/Typography";
import notFoundError from "../lib/notFoundError";
import GroupedListCards from "../components/GroupedListCards";
import TeamListItem from "../components/TeamListItem";

const Teams = ({ page, maxPage, refetchOnLoad }) => {
  const itemRenderer = React.useCallback(({ item: team, style, isLast }) => {
    return (
      <div key={team.key} style={style}>
        <TeamListItem team={team} divider={!isLast} />
      </div>
    );
  }, []);

  const [teams, teamsFetchStatus, refetchTeams] = useData(
    state => getAllTeamsFetchStatus(state),
    state => getAllTeams(state),
    React.useMemo(() => fetchAllTeams(), []),
    refetchOnLoad.teams
  );

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
      isLoading={teamsFetchStatus === "fetching"}
      refreshFunction={refetchTeams}
    >
      <Typography variant="h4">Teams</Typography>
      <GroupedListCards
        groups={groups}
        itemRenderer={itemRenderer}
        itemHeight={65}
        ssrFallbackId="team-list-server-fallback"
        ssrGroup={page}
        singularCountLabel="Team"
        pluralCountLabel="Teams"
      />
    </Page>
  );
};

Teams.getInitialProps = async ({ reduxStore, query }) => {
  const state = reduxStore.getState();

  // Ensure query.page is a positive integer <= maxPage
  let pageNum = 0;
  const maxPage = (state.getIn(["apiStatus", "max_teams_page"]) * 10) / 2 - 1;
  let validPage = true;
  if (query.page) {
    if (query.page.match(/^\d+$/)) {
      // convert 1-index to 0-index
      pageNum = parseInt(query.page, 10) - 1;
      if (pageNum <= 0 || pageNum >= maxPage) {
        validPage = false;
      }
    } else {
      validPage = false;
    }
  }

  const teamsFetchInitial = getAllTeamsFetchStatus(state) !== "success";
  if (validPage) {
    // Only fetch teams if page is valid
    const fetchPromises = [];
    if (teamsFetchInitial) {
      fetchPromises.push(reduxStore.dispatch(fetchAllTeams()));
    }
    await Promise.all(fetchPromises);
  }

  return {
    page: pageNum,
    maxPage,
    refetchOnLoad: {
      teams: !teamsFetchInitial,
    },
  };
};

Teams.propTypes = {
  page: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  refetchOnLoad: PropTypes.object,
};

export default Teams;
