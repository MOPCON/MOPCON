import React, { Fragment } from "react";
import Hero from "./_ui/Hero";
import About from "./_ui/About";
import Venue from "./_ui/Venue";
import Transportation from "./_ui/Transportation";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <About />
      <Venue />
      <Transportation />
    </Fragment>
  );
};

export default Home;
