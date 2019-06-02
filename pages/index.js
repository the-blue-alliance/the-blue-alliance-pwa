import React from "react";
import Link from "next/link";
import Page from "../components/Page";

const Home = () => (
  <Page metaDescription="Team information and match videos and results from the FIRST Robotics Competition.">
    <h1>Home</h1>
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
