import React from "react";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const CustomProgress = withStyles(theme => ({
  root: {
    position: "fixed",
    zIndex: theme.zIndex.appBar + 1,
    height: 3,
    left: 0,
    top: 0,
    right: 0,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary[800],
  },
  barColorPrimary: {
    backgroundColor: theme.palette.secondary[500],
  },
}))(LinearProgress);

class RouteChangeProgress extends React.Component {
  state = {
    showProgress: false,
    value: 0,
  };
  running = false;
  starting = false;

  constructor(props) {
    super(props);
    Router.onRouteChangeStart = () => this.start();
    Router.onRouteChangeComplete = () => this.stop();
    Router.onRouteChangeError = () => this.error();
  }

  start = () => {
    this.running = true;
    // Don't show progress if start/stop happens quickly
    setTimeout(() => {
      if (this.running) {
        this.starting = true;
        this.setState({ showProgress: false, value: 0 });
        requestAnimationFrame(() => {
          this.setState({ showProgress: true });
          setTimeout(this.increment, 50);
        });
      }
    }, 100);
  };

  increment = () => {
    this.starting = false;
    this.setState(({ value }) => {
      let amount = 0;
      if (value >= 0 && value < 0.2) {
        amount = 0.1;
      } else if (value >= 0.2 && value < 0.5) {
        amount = 0.04;
      } else if (value >= 0.5 && value < 0.8) {
        amount = 0.02;
      } else if (value >= 0.8 && value < 0.99) {
        amount = 0.005;
      }
      return { value: value + amount };
    });
    if (this.running) {
      setTimeout(this.increment, 200);
    }
  };

  stop = () => {
    if (this.starting) {
      // Don't finish immediately if still starting
      setTimeout(this.finish, 100);
    } else {
      this.finish();
    }
  };

  finish = () => {
    this.running = false;
    this.starting = false;
    this.setState({ value: 1 });
    // Wait before hiding progress
    setTimeout(() => this.setState({ showProgress: false, value: 0 }), 500);
  };

  error = () => {
    this.running = false;
    this.starting = false;
    this.setState({ showProgress: false });
  };

  render() {
    const { showProgress, value } = this.state;
    return (
      showProgress && (
        <CustomProgress variant="determinate" value={value * 100} />
      )
    );
  }
}

export default RouteChangeProgress;
