import dynamic from "next/dynamic";
const SponsorSwiper = dynamic(() => import("../_components/SponsorSwiper"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] tablet:h-auto tablet:w-3/4 flex mx-auto animate-pulse relative">
      <div className="tablet:h-96 hidden tablet:block mx-auto rounded-3xl w-3/5 bg-cream relative z-[2]"></div>
      <div className="tablet:h-72 hidden tablet:block mx-auto rounded-3xl w-3/4 bg-cream z-[1] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
      <div className="h-full tablet:h-64 mx-auto rounded-3xl w-5/6 bg-cream absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
    </div>
  ),
});

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
      <div className="w-[min(90%,860px)] h-[350px] tablet:h-[560px] tablet:w-full mx-auto py-10 tablet:[mask-image:linear-gradient(90deg,_transparent_0%,_#fff_30%,_#fff_70%,_transparent_100%)]">
        <SponsorSwiper />
      </div>
    </section>
  );
};

export default Hero;
