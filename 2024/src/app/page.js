import React, { Fragment } from "react";
import About from "./_root/_ui/About";
import Venue from "./_root/_ui/Venue";
import NewHero from "./_root/_ui/NewHero";
import MajorReason from "./_root/_ui/MajorReason";

export default function Home() {
  return (
    <Fragment>
      <NewHero />
      <About />
      <Venue />
      <MajorReason />
    </Fragment>
  );
}
