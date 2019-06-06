import React from "react";
import Hidden from "@material-ui/core/Hidden";

import SideNav from "./SideNav";
import BottomNav from "./BottomNav";

const Navigation = () => {
  return (
    <>
      <Hidden implementation="css" smDown>
        <SideNav />
      </Hidden>
      <Hidden implementation="css" mdUp>
        <BottomNav />
      </Hidden>
    </>
  );
};

Navigation.propTypes = {};

export default Navigation;
