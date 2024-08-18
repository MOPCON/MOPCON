"use client";
import SponsorCard from "../_components/SponsorCard";
import SponsorData from "@/components/data/data.json";
import { LayoutGroup } from "framer-motion";
const AnnualSponsorBlock = ({ title, children }) => {
  return (
    <div className="mb-10">
      <h3 className="font-bold tablet:text-[31px] text-lg text-black mb-6 relative z-[1]">
        {title}
      </h3>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-8">
        {children}
      </div>
    </div>
  );
};

const AnnualSponsor = () => {
  return (
    <section className="pt-16 w-[min(90%,1204px)] mx-auto">
      <h2 className="font-bold text-darkest-green text-center text-[31px] tablet:text-[39px] mb-[4rem]">
        2024 年度贊助夥伴
      </h2>
      {/* TODO: 等贊助商資訊再拿資料渲染出來 */}
      <LayoutGroup>
        {SponsorData?.sponsors.map((item, index) => (
          <AnnualSponsorBlock key={index} title={item.level}>
            {item.companies?.map((sponsor, index) => (
              <SponsorCard key={sponsor.id} {...sponsor} />
            ))}
          </AnnualSponsorBlock>
        ))}
      </LayoutGroup>
    </section>
  );
};

export default AnnualSponsor;
