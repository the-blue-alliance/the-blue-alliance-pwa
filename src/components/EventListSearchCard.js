import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from "@material-ui/icons/FilterList";
import EventFilterChipContainer from "../containers/EventFilterChipContainer";
import useQueryParam from "../lib/useQueryParam";
import useQueryParamSet from "../lib/useQueryParamSet";
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

const EventListSearchCard = () => {
  const classes = useStyles();
  const searchRef = useSearchFocus();
  const [searchStr, setSearchStr] = useQueryParam("search");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const filters = useQueryParamSet("filters")[0];

  const handleSearchStrChange = React.useCallback(
    e => {
      setSearchStr(e.target.value);
    },
    [setSearchStr]
  );
  const toggleFilterOpen = React.useCallback(() => setFilterOpen(!filterOpen), [
    setFilterOpen,
    filterOpen,
  ]);

  return (
    <Paper className={classes.inputCard} square>
      <div className={classes.inputRow}>
        <TextField
          className={classes.input}
          inputRef={searchRef}
          label="Search by name"
          value={searchStr || ""}
          onChange={handleSearchStrChange}
          margin="none"
        />
        <IconButton onClick={toggleFilterOpen}>
          <Badge badgeContent={filters.size} color="secondary">
            <FilterListIcon />
          </Badge>
        </IconButton>
      </div>
      <Collapse in={filterOpen}>
        <Typography variant="subtitle1">Filters</Typography>
        <EventFilterChipContainer
          filterKey="regional"
          label="Regional"
          color="#fff"
        />
        <EventFilterChipContainer filterKey="fim" label="FIM" color="#3f51b5" />
      </Collapse>
    </Paper>
  );
};

export default React.memo(EventListSearchCard);
