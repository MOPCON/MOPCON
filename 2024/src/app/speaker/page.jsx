import React, { Fragment } from "react";
import SpeakerSection from "./_components/SpeakerSection";

export const metadata = {
  title: "講者陣容",
  description:
    "今年，MOPCON 以「世界樹」為主題，象徵技術在長時間的滋養下茁壯成樹，開枝散葉。我們邀請了來自各領域的技術先鋒，從資深前輩到前沿技術創新者，將到場分享長時間積累的經驗與見解，讓這場活動更加多元，也貫徹 MOPCON 的精神，使參與的會眾都能從中獲得養分，並且達到進一步的交流。",
};

const Speaker = () => {
  return (
    <Fragment>
      <section className="py-16 min-h-96 h-auto flex justify-center items-center">
        <div className="mx-auto w-[min(90%,860px)]">
          <h1 className="font-bold text-5xl text-darkest-green text-center mb-5">
            世界樹下的智慧種子
          </h1>
          <h2 className="font-medium text-2xl text-black underline decoration-1 underline-offset-4 text-center mb-5">
            MOPCON 2024，不僅是一次學習，更是一場共生共長的技術旅程！
          </h2>
          <p className="text-N800/80 leading-6">
            今年，MOPCON
            以「世界樹」為主題，象徵技術在長時間的滋養下茁壯成樹，開枝散葉。我們邀請了來自各領域的技術先鋒，從資深前輩到前沿技術創新者，將到場分享長時間積累的經驗與見解，讓這場活動更加多元，也貫徹
            MOPCON 的精神，使參與的會眾都能從中獲得養分，並且達到進一步的交流。
          </p>
        </div>
      </section>
      <section className="py-16 w-[min(90%,1204px)] mx-auto">
        <h3 className="block-title mb-[60px]">
          開箱 <span className="text-light-green">高手陣容</span>
        </h3>
        <SpeakerSection />
      </section>
    </Fragment>
  );
};

export default Speaker;
