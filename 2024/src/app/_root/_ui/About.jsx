import React from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";

const About = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute top-0 left-0 w-full h-2/6 z-[-1] bg-[#F4F7FA]" />
      <article className="w-[min(90%,1062px)] mx-auto ">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-[#AEBECF] mb-5">
            關於 MOPCON
            <svg
              width="62"
              height="18"
              viewBox="0 0 62 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 9H60M60 9L55.4813 5M60 9L55.4813 13"
                stroke="#AEBECF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-[40px] font-bold text-[#161C2D] mb-3">
            南台灣 <span className="text-light-green">最大行動科技年會</span>
          </h2>
          <h3 className="text-secondary text-2xl">
            聚集知識與人才<span className="text-[#161C2D]">x</span>
            南台灣最大行動科技年會<span className="text-[#161C2D]">x</span>
            放大科技創新力
          </h3>
        </div>
        <div className="flex items-center justify-center rounded-2xl overflow-clip flex-shrink-0">
          <Image
            className="object-cover size-full max-w-full"
            src={getImageSrc("/img/2023-mopcon.webp")}
            width={522}
            height={380}
            alt="MOPCON 活動照片"
          />
        </div>
        <div className="grid grid-cols-3 gap-5 laptop:mt-20">
          <h4 className="flex items-center justify-center flex-col font-bold text-[#161C2D]/70">
            <span className="text-2xl">持續舉辦</span>
            <span className="text-[40px] laptop:text-[80px] text-[#161C2D]">
              12
            </span>
            <span className="text-2xl">年</span>
          </h4>
          <h4 className="flex items-center justify-center flex-col font-bold text-[#161C2D]/70">
            <span className="text-2xl">精彩議程</span>
            <span className="text-[40px] laptop:text-[80px] text-[#161C2D]">
              30
            </span>
            <span className="text-2xl">場以上</span>
          </h4>
          <h4 className="flex items-center justify-center flex-col font-bold text-[#161C2D]/70">
            <span className="text-2xl">熱情會眾</span>
            <span className="text-[40px] laptop:text-[80px] text-[#161C2D]">
              1000
            </span>
            <span className="text-2xl">人以上</span>
          </h4>
        </div>
        <div className="text-N800/80 text-lg mt-14 mb-5">
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
        <div className="text-xl font-black text-end text-orange/80 relative">
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
