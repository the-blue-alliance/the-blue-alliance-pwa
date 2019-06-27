import React from "react";
import PropTypes from "prop-types";
import Page from "../components/Page";
import Typography from "@material-ui/core/Typography";

const Match = ({ matchKey }) => (
  <Page title={`Match ${matchKey}`} metaDescription="TODO">
    <Typography variant="h4">Match {matchKey}</Typography>
    <Typography>TODO</Typography>
  </Page>
);

Match.getInitialProps = async ({ query }) => {
  const matchKey = query.matchKey;
  return {
    matchKey,
  };
};

Match.propTypes = {
  matchKey: PropTypes.string,
};

export default Match;
