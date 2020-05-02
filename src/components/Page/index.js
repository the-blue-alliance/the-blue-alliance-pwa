import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import RefreshIcon from "@material-ui/icons/Refresh";
import ShareIcon from "@material-ui/icons/Share";
import * as clipboard from "clipboard-polyfill";

import { sideNavWidth } from "../../constants/Config";
import PageHead from "../PageHead";
import TBALogoSVG from "../../icons/tba_lamp.svg";
import Search from "./Search";

const useStyles = makeStyles(theme => ({
  toolbar: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
  },
  logo: {
    height: 48,
    width: 48,
  },
  appBarTitle: {
    flex: 1,
  },
  progress: {
    width: 48,
    height: 24,
    padding: 2,
    textAlign: "center",
  },
  container: {
    marginTop: 56,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      marginTop: 48,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 64,
    },
    marginBottom: 56,
    [theme.breakpoints.up("md")]: {
      marginBottom: 0,
      marginLeft: sideNavWidth,
    },
  },
  content: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: `${theme.spacing(3)}px ${theme.spacing(1)}px 0`,
    [theme.breakpoints.up("md")]: {
      padding: `${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
    },
  },
}));

const Page = ({
  children,
  title,
  metaDescription,
  metaOgImage,
  additionalMetas,
  refreshFunction,
  isLoading,
}) => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarOpenedOnce, setSnackbarOpenedOnce] = React.useState(false);
  const classes = useStyles();

  const handleBack = React.useCallback(() => window.history.back(), []);
  const handleShare = React.useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: document.URL,
      });
    } else {
      clipboard.writeText(document.URL);
      setSnackbarOpen(true);
      setSnackbarOpenedOnce(true);
    }
  }, []);
  const handleSnackbarClose = React.useCallback(
    () => setSnackbarOpen(false),
    []
  );

  return (
    <>
      <PageHead />
      <Head>
        <title>{title && `${title} - `}The Blue Alliance</title>
        <meta name="description" content={metaDescription} />
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
        <Toolbar className={classes.toolbar}>
          {title ? (
            <IconButton color="inherit" onClick={handleBack} aria-label="Back">
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <img className={classes.logo} src={TBALogoSVG} alt="TBA Logo" />
          )}
          <Typography
            className={classes.appBarTitle}
            variant="h6"
            color="inherit"
            noWrap
          >
            {title ? title : "The Blue Alliance"}
          </Typography>
          <Search />
          {isLoading && (
            <div className={classes.progress}>
              <CircularProgress
                color="secondary"
                variant="indeterminate"
                size={20}
                thickness={5}
                disableShrink
              />
            </div>
          )}
          {!isLoading && refreshFunction && (
            <IconButton
              color="inherit"
              onClick={refreshFunction}
              aria-label="Refresh"
            >
              <RefreshIcon />
            </IconButton>
          )}
          <IconButton color="inherit" onClick={handleShare} aria-label="Share">
            <ShareIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <main className={classes.content}>{children}</main>
      </div>
      {snackbarOpenedOnce && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          autoHideDuration={2000}
          message="Link copied!"
        />
      )}
    </>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  title: PropTypes.string,
  metaDescription: PropTypes.string.isRequired,
  metaOgImage: PropTypes.string,
  additionalMetas: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  isLoading: PropTypes.bool,
  refreshFunction: PropTypes.func,
};

export default Page;
