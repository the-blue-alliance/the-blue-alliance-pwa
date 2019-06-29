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
import EventFilterChipContainer from "../../containers/EventFilterChipContainer";
import useQueryParam from "../../lib/useQueryParam";
import useQueryParamSet from "../../lib/useQueryParamSet";
import useSearchFocus from "../../lib/useSearchFocus";
import districtColors from "../../constants/DistrictColors";

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
    zIndex: 1,
  },
  inputRow: {
    display: "flex",
  },
  input: {
    flex: 1,
    paddingRight: theme.spacing(1),
  },
}));

const EventListSearchCard = ({ events }) => {
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

  // Determine which districts filters to show
  let hasRegional = false;
  const districtsSet = new Set();
  events.forEach(event => {
    if (event.district) {
      districtsSet.add(event.district.get("abbreviation"));
    } else if (event.isRegional()) {
      hasRegional = true;
    }
  });
  const districts = Array.from(districtsSet).sort();
  const hasDistricts = districts.length > 0;

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
        {hasDistricts && (
          <IconButton onClick={toggleFilterOpen}>
            <Badge badgeContent={filters.size} color="secondary">
              <FilterListIcon />
            </Badge>
          </IconButton>
        )}
      </div>
      {hasDistricts && (
        <Collapse in={filterOpen}>
          <Typography variant="subtitle1">Filters</Typography>
          {hasRegional && (
            <EventFilterChipContainer
              filterKey="regional"
              label="Regional"
              color={districtColors.regional}
            />
          )}
          {districts.map(district => (
            <EventFilterChipContainer
              key={district}
              filterKey={district}
              label={`${district.toUpperCase()} District`}
              color={districtColors[district]}
            />
          ))}
        </Collapse>
      )}
    </Paper>
  );
};

EventListSearchCard.propTypes = {
  events: PropTypes.object,
};

export default React.memo(EventListSearchCard);
