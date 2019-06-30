import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";

const styles = theme => ({
  tabs: {
    position: "sticky",
    top: 56 - 1,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      top: 48 - 1,
    },
    [theme.breakpoints.up("sm")]: {
      top: 64 - 1,
    },
    marginLeft: -theme.spacing(1),
    marginRight: -theme.spacing(1),
    marginBottom: theme.spacing(2),
    zIndex: theme.zIndex.appBar - 1,
    willChange: "transform", // Fix chrome rendering issue
    color:
      theme.palette.type === "light"
        ? theme.palette.common.black
        : theme.palette.common.white,
  },
});

class PageTabs extends PureComponent {
  render() {
    const { classes, children, value, onChange } = this.props;
    return (
      <Paper className={classes.tabs} square>
        <Tabs value={value} onChange={onChange} variant="scrollable">
          {children}
        </Tabs>
      </Paper>
    );
  }
}

PageTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(PageTabs);
