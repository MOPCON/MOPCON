import React, { Fragment } from "react";
import SpeakerSection from "./_components/SpeakerSection";

export const metadata = {
  title: "講者陣容",
  description:
    "每年我們都邀請了超過 25 位講師來到現場，包含知名的前端開發者、軟體工程師、資深架構師、設計師，以及專案經理等等，讓這場活動更加多元，也貫徹 MOPCON 的精神，使參與的會眾都能從中獲得養分，甚至達到進一步的交流。",
};

const Speaker = () => {
  return (
    <Fragment>
      <section className="py-16 min-h-96 h-auto flex justify-center items-center">
        <div className="mx-auto w-[min(90%,860px)]">
          <h1 className="font-bold text-5xl text-darkest-green text-center mb-5">
            啟動高速資訊交流圈的佼佼者們
          </h1>
          <h2 className="font-medium text-2xl text-black underline decoration-1 underline-offset-4 text-center mb-5">
            MOPCON 志在打造出一座「高速資訊交流圈」！
          </h2>
          <p className="text-N800/80 leading-6">
            每年我們都邀請了超過 25
            位講師來到現場，包含知名的前端開發者、軟體工程師、資深架構師、設計師，以及專案經理等等，讓這場活動更加多元，也貫徹
            MOPCON 的精神，使參與的會眾都能從中獲得養分，甚至達到進一步的交流。
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
