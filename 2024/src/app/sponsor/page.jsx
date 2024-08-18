import { Fragment } from "react";
import Hero from "./_ui/Hero";
import JoinUs from "./_ui/JoinUs";
import AnnualSponsor from "./_ui/AnnualSponsor";
import RecruitPartner from "./_ui/RecruitPartner";

export const metadata = {
  title: "贊助夥伴",
  description: "2024 年度的 MOPCON 贊助夥伴。",
};

const SponsorPage = () => {
  return (
    <Fragment>
      <Hero />
      <JoinUs />
      <AnnualSponsor />
      <RecruitPartner />
    </Fragment>
  );
};

export default SponsorPage;
