import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import NextComposedLink from "../NextComposedLink";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing(1),
    color:
      theme.palette.type === "light"
        ? theme.palette.grey[700]
        : theme.palette.grey[300],
  },
  active: {
    color: theme.palette.linkColor,
  },
}));

const BottomNavButton = ({ label, icon: Icon, href, active, ...restProps }) => {
  const classes = useStyles();
  return (
    <ButtonBase
      className={clsx({
        [classes.root]: true,
        [classes.active]: active,
      })}
      component={NextComposedLink}
      href={href}
      focusRipple
      {...restProps}
    >
      <Icon />
      {label && <div>{label}</div>}
    </ButtonBase>
  );
};

BottomNavButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default React.memo(BottomNavButton);
