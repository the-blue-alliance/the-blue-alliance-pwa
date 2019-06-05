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
    color: theme.palette.grey[700]
  },
  active: {
    color: theme.palette.primary[500]
  }
}));

const BottomNavButton = ({
  label,
  icon: Icon,
  href,
  prefetch,
  active,
  ...restProps
}) => {
  const classes = useStyles();
  return (
    <ButtonBase
      className={clsx({
        [classes.root]: true,
        [classes.active]: active
      })}
      component={NextComposedLink}
      href={href}
      prefetch={prefetch}
      focusRipple
      {...restProps}
    >
      <Icon />
      <div>{label}</div>
    </ButtonBase>
  );
};

BottomNavButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  prefetch: PropTypes.bool,
  active: PropTypes.bool
};

export default React.memo(BottomNavButton);
