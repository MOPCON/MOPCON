import Hero from "./_ui/Hero";
import AnnualSponsor from "./_ui/AnnualSponsor";
import { Fragment } from "react";
import SponsorCard from "./_components/SponsorCard";
import JoinUs from "./_ui/JoinUs";
import { getData } from "@/components/util/getData";

export const metadata = {
  title: "贊助夥伴",
  description: "2024 年度的 MOPCON 贊助夥伴。",
};

const SponsorPage = async () => {
  const SponsorData = await getData();

  return (
    <Fragment>
      <Hero />
      <section className="py-16 w-[min(90%,1204px)] mx-auto">
        <h2 className="font-bold text-darkest-green text-center text-[39px] mb-[4rem]">
          2024 年度贊助夥伴
        </h2>
        {/* TODO: 等贊助商資訊再拿資料渲染出來 */}
        {SponsorData?.sponsors.map((item, index) => (
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
