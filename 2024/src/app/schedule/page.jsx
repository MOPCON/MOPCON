import { Fragment } from "react";
import Hero from "./_ui/Hero";
import ScheduleSection from "./_ui/ScheduleSection";
import { SectionTitle, SectionBlock } from "@/components/ui/SectionBlock";
import { getImageSrc } from "@/components/util/getImageSrc";
import Image from "next/image";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "議程介紹",
  description:
    "MOPCON 2024，將帶你探索技術之樹的每一條分枝，從基礎知識到前沿趨勢，無論你是哪一個分枝的探險者，都能在這裡找到屬於自己的知識之路，親身感受技術的脈動、在未來之林中開創屬於自己的方向。",
};
const Page = () => {
  return (
    <Fragment>
      <Hero />
      <SectionBlock className="bg-[#F4F7FA]">
        <Image
          src={getImageSrc("/community/bg-wave.svg")}
          alt="behavioral-guidelines-bg"
          width={1920}
          height={1080}
          className="absolute w-full object-cover left-1/2 top-0 -translate-x-1/2 translate-y-1/3 pointer-events-none"
          aria-hidden="true"
        />
        <div className="w-[min(90%,1062px)] mx-auto">
          <SectionTitle arrowTitle="議程表" className="mb-10">
            精彩議程
          </SectionTitle>
        </div>
        <Suspense>
          <ScheduleSection />
        </Suspense>
      </SectionBlock>
      <Toaster />
    </Fragment>
  );
};

export default Page;
