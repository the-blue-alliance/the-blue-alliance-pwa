import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { useInView } from "react-intersection-observer";

const useStyles = makeStyles(theme => ({
  paper: ({ offset }) => ({
    position: "sticky",
    top: 56 + offset,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      top: 48 + offset,
    },
    [theme.breakpoints.up("sm")]: {
      top: 64 + offset,
    },
    zIndex: theme.zIndex.appBar - 2,
  }),
  observer: ({ offset }) => ({
    position: "absolute",
    top: -(56 + offset + 1), // +1 because element wont go out of view when stuck
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      top: -(48 + offset + 1),
    },
    [theme.breakpoints.up("sm")]: {
      top: -(64 + offset + 1),
    },
  }),
  label: {
    padding: "4px 16px",
    fontSize: 20,
  },
}));

const StickySectionHeader = ({ children, offset = 0 }) => {
  const classes = useStyles({ offset });
  const [ref, inView, entry] = useInView();
  const isRaised = entry !== undefined && !inView;
  return (
    <>
      <Paper
        className={classes.paper}
        elevation={isRaised ? 2 : 0}
        square={isRaised}
      >
        <div ref={ref} className={classes.observer} />
        {typeof children === "string" ? (
          <div className={classes.label}>{children}</div>
        ) : (
          children
        )}
      </Paper>
      <Divider />
    </>
  );
};

StickySectionHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  offset: PropTypes.number,
};

export default React.memo(StickySectionHeader);
