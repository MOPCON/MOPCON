import React, { Fragment } from "react";
import Hero from "./_ui/Hero";
import JoinTeam from "./_ui/JoinTeam";
import JoinCommunity from "./_ui/JoinCommunity";
import BehavioralGuidelines from "./_ui/BehavioralGuidelines";

const Page = () => {
  return (
    <Fragment>
      <Hero />
      <JoinTeam />
      <JoinCommunity />
      <BehavioralGuidelines />
    </Fragment>
  );
};

export default Page;
