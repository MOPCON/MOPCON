import { Fragment } from "react";
import MemberSection from "./_components/MemberSection";
import {
  HeroSection,
  HeroTitle,
  HeroContent,
} from "@/components/ui/HeroSection";
import { SectionBlock, SectionTitle } from "@/components/ui/SectionBlock";

export const metadata = {
  title: "議程委員",
  description:
    " 「世界樹」象徵技術在時間的養分中不斷壯大，並且蓬勃發展。我們的議程委員來自各個技術領域，他們如同世界樹的守護者，精心策劃與安排每一場議程，確保參與者能夠汲取到最豐富的知識與靈感！",
};

const Page = () => {
  return (
    <Fragment>
      <HeroSection>
        <HeroTitle className="tablet:text-center mb-6 mt-10 tablet:mt-0 tablet:mb-10 flex flex-col tablet:block">
          <span>世界樹的 </span>
          <span className="text-light-green">守護者</span>
        </HeroTitle>
        <HeroContent>
          <p className="mb-3">
            「世界樹」象徵技術在時間的養分中不斷壯大，並且蓬勃發展。我們的議程委員來自各個技術領域，他們如同世界樹的守護者，精心策劃與安排每一場議程，確保參與者能夠汲取到最豐富的知識與靈感！
          </p>
          <p className="text-secondary w-fit">
            <span className="bg-highlight box-decoration-clone break-before-all ">
              為您精心打磨 MOPCON 2024 的技術盛宴！
            </span>
          </p>
        </HeroContent>
      </HeroSection>
      <SectionBlock>
        <div className="w-[min(90%,1204px)] mx-auto">
          <SectionTitle arrowTitle="議程委員">議程智囊團隊</SectionTitle>
          <MemberSection />
        </div>
      </SectionBlock>
    </Fragment>
  );
};

export default Page;
