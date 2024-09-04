import React from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import BlockTitleArrow from "@/components/ui/BlockTitleArrow";

const Introduction = ({ ...props }) => {
  return (
    <h4 className="flex items-center justify-center flex-col font-bold text-[#161C2D]/70">
      <span className="text-xl tablet:text-2xl">{props.title}</span>
      <span className="text-[64px] laptop:text-[80px] text-[#161C2D]">
        {props.num}
      </span>
      <span className="text-xl tablet:text-2xl">{props.unit}</span>
    </h4>
  );
};

const About = () => {
  return (
    <section className="py-12 tablet:py-24 relative">
      <div className="absolute top-0 left-0 w-full h-96 tablet:h-2/6 z-[-1] bg-[#F4F7FA]" />
      <article className="w-[min(90%,1062px)] mx-auto">
        <div className="mb-14">
          <BlockTitleArrow>關於 MOPCON</BlockTitleArrow>
          <h2 className="block-title text-[#161C2D] mb-3">
            南台灣 <span className="text-light-green">最大行動科技年會</span>
          </h2>
          <h3 className="text-secondary text-lg tablet:text-2xl">
            聚集知識與人才
            <span className="text-[#161C2D] inline-block mx-2">x</span>
            南台灣最大行動科技年會
            <span className="text-[#161C2D] inline-block mx-2">x</span>
            放大科技創新力
          </h3>
        </div>
        <div className="relative">
          <div className="flex items-center justify-center rounded-[40px] overflow-clip flex-shrink-0 shadow-[10px_10px_50px_0px_rgba(0,0,0,0.15)]">
            <Image
              className="object-cover size-full max-w-full"
              src={getImageSrc("/img/2023-mopcon.webp")}
              width={522}
              height={380}
              alt="MOPCON 活動照片"
            />
          </div>
          <Image
            className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 pointer-events-none -z-10"
            src={getImageSrc("/img/Dot02.svg")}
            alt="bg-dots"
            aria-hidden="true"
            width={192}
            height={90}
          />
        </div>
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-10 tablet:gap-5 mt-10 laptop:mt-20">
          <Introduction title="持續舉辦" num="12" unit="年" />
          <Introduction title="精彩議程" num="30" unit="場以上" />
          <Introduction title="熱情會眾" num="1000" unit="人以上" />
        </div>
        <div className="text-N800/80 text-lg mt-14 mb-5 relative">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0 -z-10 -translate-x-10 -translate-y-1/4 hidden tablet:block"
          >
            <path
              d="M100 60C100 82.0914 82.0914 100 60 100L0 100L5.24537e-06 40C7.17666e-06 17.9086 17.9086 -7.17666e-06 40 -5.24537e-06L100 0L100 60Z"
              fill="#FEF3E2"
            />
          </svg>
          <Image
            className="absolute left-0 bottom-0 -translate-x-1/3 translate-y-1/3 pointer-events-none -z-10 hidden tablet:block"
            src={getImageSrc("/img/Dot01.svg")}
            alt="bg-dots"
            aria-hidden="true"
            width={192}
            height={90}
          />
          <p className="mb-3">
            MOPCON 為熱愛「科技」的民間好手所自發的活動，今年邁入第 13
            年囉！從2012 年開始，每年吸引跨產業參加人數持續攀升，從
            160人的小型聚會，逐漸成為 1000 人以上的科技盛宴！
          </p>
          <p className="mb-3">
            透過每年堅持的交流盛會，持續匯集知識、人才與資源，打造高速資訊交流圈，也促進人才流動與就業機會，帶動南台灣高經濟產業循環。相信每個參與者都能將這些知識與資源帶回自己公司、團隊，讓這份能力產生更大的影響力。
          </p>
          <p className="mb-3">
            2024年，我們將以「Inspiration」為主題，深入探討前沿技術的實際應用與跨界整合，從AI到跨平台、行動應用到雲服務，讓我們一起揮灑創意，共同塑造科技未來的精彩！
          </p>
          <p>準備好了嗎？讓我們一起在 MOPCON 2024 尋找未來世界的敲門磚吧！</p>
        </div>
        <div className="text-xl font-black text-end text-orange/80 relative hidden tablet:block">
          Inspiration, Rooted in $&#123;con&#125;
          <svg
            width="94"
            height="8"
            viewBox="0 0 94 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 translate-x-[calc(100%+12px)] top-1/2 -translate-y-1/2"
          >
            <path
              d="M68 4C68 5.65685 66.6569 7 65 7C63.3431 7 62 5.65685 62 4M68 4C68 2.34315 66.6569 1 65 1C63.3431 1 62 2.34315 62 4M68 4H93M62 4H1"
              stroke="#FCAA38"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </article>
    </section>
  );
};

export default About;
