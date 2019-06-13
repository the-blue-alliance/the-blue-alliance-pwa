import React, { useState } from "react";
import Page from "../components/Page";
import Link from "../components/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Home = () => {
  const [error, setError] = useState(false);
  if (error) {
    throw new Error("RIP");
  }
  return (
    <Page metaDescription="Team information and match videos and results from the FIRST Robotics Competition.">
      <Typography variant="h4">Home</Typography>
      <Link href="/events">Events</Link>
      <br />
      <Link href="/event?eventKey=2019casj" as="/event/2019casj">
        2019casj
      </Link>
      <br />
      <Button variant="outlined" onClick={() => setError(true)}>
        Error!
      </Button>
    </Page>
  );
};

export default Home;
