"use client";

import { SectionBlock, SectionTitle } from "@/components/ui/SectionBlock";
import { getImageSrc } from "@/components/util/getImageSrc";
import Image from "next/image";

const TimeMachineBlock = () => {
  return (
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
        <div className="flex flex-col-reverse tablet:flex-col">
          <div className="relative tablet:w-1/2 tablet:mx-auto p-2 mb-8 [mask-image:linear-gradient(90deg,_transparent_0%,_#fff_30%,_#fff_70%,_transparent_100%)] tablet:[mask-image:none]"></div>
        </div>
      </div>
    </SectionBlock>
  );
};

export default TimeMachineBlock;
