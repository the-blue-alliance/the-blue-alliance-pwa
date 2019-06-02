import React from "react";
import PropTypes from "prop-types";
import Page from "../components/Page";
import Link from "../components/Link";

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <Page
        title={`Error ${statusCode}`}
        metaDescription={`Error ${statusCode}`}
      >
        <div>An error {statusCode} occurred.</div>
        <Link href="/">Home</Link>
      </Page>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number.isRequired
};

export default Error;
