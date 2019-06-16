import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from "@material-ui/icons/FilterList";
import EventFilterChip from "../components/EventFilterChip";
import useSearchFocus from "../lib/useSearchFocus";

const useStyles = makeStyles(theme => ({
  inputCard: {
    padding: theme.spacing(1),
    position: "sticky",
    top: 56,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      top: 48,
    },
    [theme.breakpoints.up("sm")]: {
      top: 64,
    },
  },
  inputRow: {
    display: "flex",
  },
  input: {
    flex: 1,
    paddingRight: theme.spacing(1),
  },
}));

const EventListSearchCard = ({ searchStr, handleChange }) => {
  const classes = useStyles();
  const searchRef = useSearchFocus();
  const [filterOpen, setFilterOpen] = React.useState(false);
  return (
    <Paper className={classes.inputCard} square>
      <div className={classes.inputRow}>
        <TextField
          className={classes.input}
          inputRef={searchRef}
          label="Search by name"
          value={searchStr}
          onChange={handleChange}
          margin="none"
        />
        <IconButton onClick={() => setFilterOpen(!filterOpen)}>
          <Badge badgeContent={4} color="secondary">
            <FilterListIcon />
          </Badge>
        </IconButton>
      </div>
      <Collapse in={filterOpen}>
        <Typography variant="subtitle1">Filters</Typography>
        <EventFilterChip
          label="Regional"
          color="#fff"
          onClick={() => console.log("!")}
        />
        <EventFilterChip
          label="FIM"
          color="#3f51b5"
          onClick={() => console.log("!")}
        />
      </Collapse>
    </Paper>
  );
};

EventListSearchCard.propTypes = {
  searchStr: PropTypes.string,
  handleChange: PropTypes.func,
};

export default React.memo(EventListSearchCard);
