import { Fragment } from "react";
import Hero from "./_ui/Hero";
// import TimeMachineBlock from "./_ui/TimeMachineBlock";
import { SectionBlock, SectionTitle } from "@/components/ui/SectionBlock";
import { getImageSrc } from "@/components/util/getImageSrc";
import Image from "next/image";

export const metadata = {
  title: "時光機",
  description:
    " MOPCON 全名為 Mobile Open Platform Conference，為非營利的技術研討會，成立宗旨為針對移動通訊領域結合實際的產業面與工程研發做比較深入的探討",
};

const Page = () => {
  return (
    <Fragment>
      <Hero />
      <SectionBlock className="relative bg-[#F4F7FA]">
        <Image
          src={getImageSrc("/community/bg-wave.svg")}
          alt="behavioral-guidelines-bg"
          width={1920}
          height={1080}
          className="absolute -z-10 w-full object-cover left-1/2 top-0 -translate-x-1/2 translate-y-1/3 pointer-events-none"
          aria-hidden="true"
        />
        <div className="w-[min(90%,1062px)] mx-auto mb-10 tablet:mb-14 laptop:mb-20">
          <SectionTitle arrowTitle="HISTORY" className="mb-20">
            歷年 MOPCON
          </SectionTitle>
          {/* <TimeMachineBlock /> */}
        </div>
      </SectionBlock>
    </Fragment>
  );
};

export default Page;
