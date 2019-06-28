import React from "react";
import { useRouter } from "next/router";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import NoSsr from "@material-ui/core/NoSsr";
import ThemeToggleListItem from "./ThemeToggleListItem";

const TestingItems = () => {
  const router = useRouter();
  return (
    <>
      <ListSubheader component="div">Temp for testing</ListSubheader>
      <ThemeToggleListItem />
      <ListItem component="code" dense>
        Path: {router.pathname}
      </ListItem>
      <ListItem component="code" dense>
        Params: {JSON.stringify(router.query, null, 1)}
      </ListItem>
      <ListItem component="code" dense>
        History state:{" "}
        <NoSsr>
          {typeof history !== "undefined" &&
            JSON.stringify(history.state, null, 1)}
        </NoSsr>
      </ListItem>
    </>
  );
};

export default React.memo(TestingItems);
