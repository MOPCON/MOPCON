import { Fragment } from "react";
import Hero from "./_ui/Hero";
import JoinUs from "./_ui/JoinUs";
import AnnualSponsor from "./_ui/AnnualSponsor";
import RecruitPartner from "./_ui/RecruitPartner";

export const metadata = {
  title: "贊助夥伴",
  description:
    "MOPCON 目前已是南台灣最大技術社群研討會，成立宗旨為連結產業與資訊工程技術，以培養更多資訊科技人才，推動高雄產業創新發展，而沒有夥伴們的支持，這個願景就不可能成真！謝謝這 10 年來每一位夥伴的加入，和我們一起凝聚南臺灣的人才和知識，共同成長、學習！",
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
