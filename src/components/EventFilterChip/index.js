import React from "react";
import PropTypes from "prop-types";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  dot: {
    marginRight: theme.spacing(1),
    height: 12,
    width: 12,
    borderRadius: "50%",
    display: "inline-block",
  },
}));

const EventFilterChip = ({ label, color, selected, ...restProps }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Chip
      className={classes.chip}
      size="small"
      style={
        selected
          ? {
              backgroundColor: color,
              color: theme.palette.getContrastText(color),
              border: `1px solid ${theme.palette.getContrastText(color)}`,
            }
          : {}
      }
      label={
        <>
          <span
            className={classes.dot}
            style={{
              backgroundColor: color,
              border: `1px solid ${
                selected ? theme.palette.getContrastText(color) : "#000"
              }`,
            }}
          />
          {label}
        </>
      }
      {...restProps}
    />
  );
};

EventFilterChip.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

export default React.memo(EventFilterChip);
