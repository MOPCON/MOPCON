import React from "react";
import SponsorSwiper from "../_components/SponsorSwiper";

const Hero = () => {
  return (
    <section className="py-24">
      <div className="w-[min(90%,860px)] mx-auto mb-8 tablet:mb-16">
        <h1 className="font-bold text-[39px] tablet:text-5xl text-darkest-green text-center leading-tight">
          感謝贊助夥伴的支持
          <br />
          有您們才能成就 MOPCON
        </h1>
        <p className="text-N800/80 leading-6 mt-5 tablet:mt-10">
          MOPCON
          目前已是南台灣最大技術社群研討會，成立宗旨為連結產業與資訊工程技術，以培養更多資訊科技人才，推動高雄產業創新發展，而沒有夥伴們的支持，這個願景就不可能成真！謝謝這
          10
          年來每一位夥伴的加入，和我們一起凝聚南臺灣的人才和知識，共同成長、學習！
        </p>
      </div>
      <div className="w-[min(90%,860px)] tablet:w-full mx-auto py-10 tablet:[mask-image:linear-gradient(90deg,_transparent_0%,_#fff_20%,_#fff_80%,_transparent_100%)]">
        <SponsorSwiper />
      </div>
    </section>
  );
};

export default Hero;
