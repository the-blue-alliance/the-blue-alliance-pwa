import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import Head from "next/head";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Page = ({
  router,
  children,
  title,
  metaDescription,
  metaOgImage,
  additionalMetas
}) => {
  const canonicalUrl = `https://www.thebluealliance.com${router.asPath}`;
  return (
    <>
      <Head>
        <title>{title && `${title} - `}The Blue Alliance</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="The Blue Alliance" />
        <meta
          property="og:title"
          content={title ? title : "The Blue Alliance"}
        />
        <meta
          property="og:image"
          content={
            metaOgImage
              ? metaOgImage
              : "https://www.thebluealliance.com/images/logo_square_512.png"
          }
        />
        <meta property="og:description" content={metaDescription} />
        {additionalMetas}
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
  metaDescription: PropTypes.string.isRequired,
  metaOgImage: PropTypes.string,
  additionalMetas: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default withRouter(Page);
