import React from "react";
import PropTypes from "prop-types";
import useQueryParamSet from "../lib/useQueryParamSet";
import EventFilterChip from "../components/EventFilterChip";

const ComponentTemplate = ({ filterKey, ...restProps }) => {
  const [filters, addFilter, deleteFilter] = useQueryParamSet("filters");
  const selected = filters.has(filterKey);
  const toggleFilter = React.useCallback(() => {
    if (selected) {
      deleteFilter(filterKey);
    } else {
      addFilter(filterKey);
    }
  }, [filterKey, selected, addFilter, deleteFilter]);

  return (
    <EventFilterChip
      {...restProps}
      onClick={toggleFilter}
      selected={selected}
    />
  );
};

ComponentTemplate.propTypes = {
  filterKey: PropTypes.string.isRequired,
};

export default React.memo(ComponentTemplate);
