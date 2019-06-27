import React from "react";
import PropTypes from "prop-types";
import Page from "../components/Page";
import Typography from "@material-ui/core/Typography";

const Team = ({ teamKey }) => (
  <Page title={`Team ${teamKey}`} metaDescription="TODO">
    <Typography variant="h4">Team {teamKey}</Typography>
    <Typography>TODO</Typography>
  </Page>
);

Team.getInitialProps = async ({ query }) => {
  const teamKey = query.teamKey;
  return {
    teamKey,
  };
};

Team.propTypes = {
  teamKey: PropTypes.string,
};

export default Team;
