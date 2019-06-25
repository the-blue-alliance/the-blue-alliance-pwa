import React from "react";
import Page from "../components/Page";
import Link from "../components/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Home = () => {
  return (
    <Page metaDescription="Team information and match videos and results from the FIRST Robotics Competition.">
      <Typography variant="h4">Home</Typography>
      <Link href="/events">Events</Link>
      <br />
      <Link href="/event?eventKey=2019casj" as="/event/2019casj">
        2019casj
      </Link>
    </Page>
  );
};

export default Home;
