import React, { Fragment } from "react";
import Hero from "./_root/_ui/Hero";
import About from "./_root/_ui/About";
import Venue from "./_root/_ui/Venue";
import Transportation from "./_root/_ui/Transportation";

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <About />
      <Venue />
      <Transportation />
    </Fragment>
  );
}
