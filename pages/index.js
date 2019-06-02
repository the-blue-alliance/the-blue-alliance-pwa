import React from "react";
import Link from "next/link";
import Page from "../components/Page";
import Typography from "@material-ui/core/Typography";

const Home = () => (
  <Page metaDescription="Team information and match videos and results from the FIRST Robotics Competition.">
    <Typography variant="h4">Home</Typography>
    <Link href="/events">
      <a>Events</a>
    </Link>
    <br />
    <Link href="/event?eventKey=2019casj" as="/event/2019casj">
      <a>2019casj</a>
    </Link>
  </Page>
);

export default Home;
