import React from "react";
import PropTypes from "prop-types";

class ServerFallback extends React.Component {
  // Enables the hydration of client without re-rendering server-only fallback
  // See https://github.com/facebook/react/issues/6985#issuecomment-326526059

  getExistingHtml(id) {
    if (typeof document === "undefined") return;
    const node = document.getElementById(id);
    return node && node.innerHTML;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { id, children } = this.props;
    const html = this.getExistingHtml(id);

    if (html) {
      // Hydrate fallback on client without re-rendering
      return <div id={id} dangerouslySetInnerHTML={{ __html: html }} />;
    }
    if (process.browser) {
      // Don't render fallback on client
      return null;
    }
    // Render fallback on server
    return <div id={id}>{children}</div>;
  }
}
ServerFallback.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ServerFallback;
