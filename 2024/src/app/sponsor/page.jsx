import Hero from "./_ui/Hero";
import AnnualSponsor from "./_ui/AnnualSponsor";
import { Fragment } from "react";
import SponsorCard from "./_components/SponsorCard";
import JoinUs from "./_ui/JoinUs";
import Data from "@/components/data/data.json";

export const metadata = {
  title: "贊助夥伴",
  description: "2024 年度的 MOPCON 贊助夥伴。",
};

const SponsorPage = () => {
  return (
    <Fragment>
      <Hero />
      <section className="py-16 w-[min(90%,1204px)] mx-auto">
        <h2 className="block-title text-center text-[39px] mb-[4rem]">
          2024 年度贊助夥伴
        </h2>
        {/* TODO: 等贊助商資訊再拿資料渲染出來 */}
        {Data.sponsors.map((item, index) => (
          <AnnualSponsor key={index} title={item.level}>
            {item.companies?.map((sponsor, index) => (
              <SponsorCard key={sponsor.id} {...sponsor} />
            ))}
          </AnnualSponsor>
        ))}
      </section>
      <JoinUs />
    </Fragment>
  );
};

export default SponsorPage;
