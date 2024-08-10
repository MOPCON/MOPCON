import React, { Fragment } from "react";
import Hero from "./_components/Hero";
import About from "./_components/About";
import Venue from "./_components/Venue";
import Transportation from "./_components/Transportation";

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
