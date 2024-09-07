import React, { Fragment } from "react";
import SpeakerSuspense from "./_components/SpeakerSuspense";
import HeroSection from "@/components/ui/HeroSection";
import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
import { SectionTitle, SectionBlock } from "@/components/ui/SectionBlock";

export const metadata = {
  title: "講者陣容",
  description:
    "今年，MOPCON 以「世界樹」為主題，象徵技術在長時間的滋養下茁壯成樹，開枝散葉。我們邀請了來自各領域的技術先鋒，從資深前輩到前沿技術創新者，將到場分享長時間積累的經驗與見解，讓這場活動更加多元，也貫徹 MOPCON 的精神，使參與的會眾都能從中獲得養分，並且達到進一步的交流。",
};

const Speaker = () => {
  return (
    <Fragment>
      <HeroSection>
        <div className="w-[min(90%,860px)] mx-auto">
          <h1 className="block-title tablet:text-center mb-6 mt-10 tablet:mt-0 tablet:mb-10 flex flex-col tablet:block">
            <span>世界樹下的</span>
            <span className="text-light-green">智慧種子</span>
          </h1>
          <p className="text-N800/80 leading-6 mx-auto mb-3">
            今年，MOPCON
            以「世界樹」為主題，象徵技術在長時間的滋養下茁壯成樹，開枝散葉。我們邀請了來自各領域的技術先鋒，從資深前輩到前沿技術創新者，將到場分享長時間積累的經驗與見解，讓這場活動更加多元，也貫徹
            MOPCON 的精神，使參與的會眾都能從中獲得養分，並且達到進一步的交流。
          </p>
          <p className="text-secondary w-fit">
            <span className="bg-highlight box-decoration-clone break-before-all ">
              MOPCON 2024，不僅是一次學習，更是一場共生共長的技術旅程！
            </span>
          </p>
        </div>
      </HeroSection>
      <SectionBlock>
        <div className="w-[min(90%,1204px)] mx-auto">
          <SectionTitle arrowTitle="講者介紹" className="mb-[60px]">
            開箱 <span className="text-light-green">高手陣容</span>
          </SectionTitle>
          <SpeakerSuspense />
        </div>
      </SectionBlock>
    </Fragment>
  );
};

export default Speaker;
