import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 56,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      marginTop: 48
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 64
    },
    marginBottom: 56,
    [theme.breakpoints.up("md")]: {
      marginBottom: 0,
      marginLeft: 190
    }
  },
  content: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: `${theme.spacing(3)}px ${theme.spacing(1)}px 0`,
    [theme.breakpoints.up("md")]: {
      padding: `${theme.spacing(3)}px ${theme.spacing(3)}px 0`
    }
  }
}));

const Page = ({
  router,
  children,
  title,
  metaDescription,
  metaOgImage,
  additionalMetas
}) => {
  const canonicalUrl = `https://www.thebluealliance.com${router.asPath}`;
  const classes = useStyles();
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
      <div className={classes.container}>
        <main className={classes.content}>{children}</main>
      </div>
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
