/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { useStore } from "react-redux";
import { useRouter } from "next/router";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { fetchAllTeams } from "../../actions";
import useData from "../../lib/useData";
import {
  getAllTeamsFetchStatus,
  getAllTeams,
} from "../../selectors/TeamSelectors";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    width: "100%",
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const filterOptions = createFilterOptions({
  limit: 5,
});

const Search = () => {
  const classes = useStyles();
  const store = useStore();
  const router = useRouter();
  React.useEffect(() => {
    store.dispatch(fetchAllTeams());
  }, []);
  const [teams, teamsFetchStatus, _] = useData(
    state => getAllTeamsFetchStatus(state),
    state => getAllTeams(state)
  );
  const [activated, setActivated] = React.useState(false);

  const options = React.useMemo(() => {
    if (activated && teams !== undefined) {
      return teams.toJS().map(team => {
        team.typeLabel = "Teams";
        return team;
      });
    }
    return [];
  }, [activated, teams]);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Autocomplete
        options={options.sort((a, b) => a.team_number < b.team_number)}
        filterOptions={filterOptions}
        groupBy={option => option.typeLabel}
        getOptionLabel={option => `${option.team_number} | ${option.nickname}`}
        onChange={(object, value) =>
          router.push(
            `/team?teamKey=${value.key}`,
            `/team/${value.team_number}`
          )
        }
        // freeSolo
        autoHighlight
        renderInput={({ InputProps, inputProps }) => {
          return (
            <InputBase
              ref={InputProps.ref}
              placeholder="Search teams and events"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={inputProps}
              onClick={() => {
                if (!activated) {
                  setActivated(true);
                }
              }}
              onChange={() => {
                if (!activated) {
                  setActivated(true);
                }
              }}
            />
          );
        }}
      />
    </div>
  );
};

Search.propTypes = {};

export default React.memo(Search);
