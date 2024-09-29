import React, { Fragment } from "react";
import Hero from "./_ui/Hero";
import JoinTeam from "./_ui/JoinTeam";
import JoinCommunity from "./_ui/JoinCommunity";
import BehavioralGuidelines from "./_ui/BehavioralGuidelines";

export const metadata = {
  title: "主辦單位",
  description:
    "MOPCON是一個專注於濁水溪以南地區的科技社群。自創立以來，我們致力於為南台灣提供一個討論技術與交流的平台。我們深知南部地區的人才和技術資源豐富，但往往缺乏能夠匯聚這些力量的場域。因此，我們的目標是提供一個專注於南部社群的舞台，讓每位社群夥伴都能夠在這裡一同交流、成長，創造共好生態系。",
};

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
