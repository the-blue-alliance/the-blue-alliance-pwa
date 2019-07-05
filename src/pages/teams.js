import React from "react";
import PropTypes from "prop-types";
import Page from "../components/Page";
// import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";
import notFoundError from "../lib/notFoundError";
import GroupedListCards from "../components/GroupedListCards";
// import WindowScrollerList from "../components/WindowScrollerList";
// import StickySectionHeader from "../components/StickySectionHeader";
import TeamListItem from "../components/TeamListItem";

// class ServerFallback extends React.Component {
//   // Enables the hydration of client without re-rendering server-only fallback
//   // See https://github.com/facebook/react/issues/6985#issuecomment-326526059
//
//   getExistingHtml(id) {
//     if (typeof document === "undefined") return;
//     const node = document.getElementById(id);
//     return node && node.innerHTML;
//   }
//
//   shouldComponentUpdate() {
//     return false;
//   }
//
//   render() {
//     const { id, children } = this.props;
//     const html = this.getExistingHtml(id);
//
//     if (html) {
//       // Hydrate fallback on client without re-rendering
//       return <div id={id} dangerouslySetInnerHTML={{ __html: html }} />;
//     }
//     if (process.browser) {
//       // Don't render fallback on client
//       return null;
//     }
//     // Render fallback on server
//     return <div id={id}>{children}</div>;
//   }
// }
// ServerFallback.propTypes = {
//   id: PropTypes.string.isRequired,
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
// };

const Teams = ({ page, maxPage, teams }) => {
  const itemRenderer = React.useCallback(team => {
    return <TeamListItem key={team.key} team={team} />;
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
      <GroupedListCards groups={groups} itemRenderer={itemRenderer} />

      {/*<NoSsr
        fallback={
          <ServerFallback id="team-list-server-fallback">
            <Paper>
              {teams.slice(minTeam - 1, maxTeam).map(team => (
                <TeamListItem key={team.key} team={team} />
              ))}
            </Paper>
          </ServerFallback>
        }
      >
        <Paper>
          <WindowScrollerList
            rowCount={teams.length}
            rowHeight={65}
            rowRenderer={rowRenderer}
            startingOffset={page === 0 ? null : (minTeam - 2) * 65}
          />
        </Paper>
      </NoSsr>*/}
    </Page>
  );
};

Teams.getInitialProps = async ({ query }) => {
  let pageNum = 0;
  const maxPage = 70; // TODO: don't hardcode

  // Temp fake teams
  const teamNumbers = Array.apply(null, { length: 1199 }).map(
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
