/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({}));

const ComponentTemplate = () => {
  const classes = useStyles();
  return <Typography>This is an example!</Typography>;
};

ComponentTemplate.propTypes = {};

export default React.memo(ComponentTemplate);
