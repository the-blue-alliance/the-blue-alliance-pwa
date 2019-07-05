import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import StickySectionHeader from "../StickySectionHeader";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(1),
  },
  header: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
  },
}));

const GroupedListCards = ({ groups, itemRenderer }) => {
  const classes = useStyles();
  return groups.map(({ header, items }, i) => {
    return (
      <Paper key={i} className={classes.card}>
        <StickySectionHeader>
          <div className={classes.header}>
            <Typography variant="h6">{header}</Typography>
          </div>
        </StickySectionHeader>
        {items.map(item => itemRenderer(item))}
      </Paper>
    );
  });
};

GroupedListCards.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.node.isRequired,
      items: PropTypes.array.isRequired,
    })
  ).isRequired,
  itemRenderer: PropTypes.func.isRequired,
};

export default React.memo(GroupedListCards);
