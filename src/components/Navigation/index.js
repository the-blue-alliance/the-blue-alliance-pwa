import React from "react";
import { useRouter } from "next/router";
import Hidden from "@material-ui/core/Hidden";

import SideNav from "./SideNav";
import BottomNav from "./BottomNav";

const Navigation = () => {
  const router = useRouter();
  const route = router.route;
  return (
    <>
      <Hidden implementation="css" smDown>
        <SideNav route={route} />
      </Hidden>
      <Hidden implementation="css" mdUp>
        <BottomNav route={route} />
      </Hidden>
    </>
  );
};

export default React.memo(Navigation);
