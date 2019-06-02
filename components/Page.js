import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import Head from "next/head";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Page = ({ router, children, title, metaDescription }) => {
  return (
    <>
      <Head>
        <title>{title && `${title} - `}The Blue Alliance</title>
        <meta name="description" content={metaDescription} />
        <link
          rel="canonical"
          href={`https://www.thebluealliance.com${router.asPath}`}
        />
      </Head>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {title ? title : "The Blue Alliance"}
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

Page.propTypes = {
  router: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  title: PropTypes.string,
  metaDescription: PropTypes.string.isRequired
};

export default withRouter(Page);
