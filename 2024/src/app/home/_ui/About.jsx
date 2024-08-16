import React from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";

const About = () => {
  return (
    <section className="w-[min(90%,1204px)] mx-auto py-24">
      <article className="grid grid-cols-1 laptop:grid-cols-6 laptop:grid-rows-5 gap-y-5 gap-x-10 laptop:gap-x-20">
        <div className="flex items-center justify-center rounded-2xl overflow-clip flex-shrink-0 col-start-1 row-start-2 laptop:col-span-3 laptop:row-span-3">
          <Image
            className="object-cover w-full h-full max-w-full"
            src={getImageSrc("/img/2023-mopcon.webp")}
            width={522}
            height={380}
            alt="MOPCON 活動照片"
          />
        </div>
        <div className="mb-5 laptop:mb-0 col-start-1 row-start-1 laptop:col-span-3 laptop:col-start-4">
          <h2 className="font-bold text-darkest-green text-center text-[31px] tablet:text-[39px]">
            關於 MOPCON
          </h2>
          <h3 className="font-medium mt-5 text-xl gap-2 laptop:gap-0 text-black underline decoration-1 underline-offset-4 text-center flex justify-center flex-col laptop:flex-row">
            <span>聚集知識與人才</span>
            <span className="hidden laptop:inline-block">X</span>{" "}
            <span> 南台灣最大行動科技年會 </span>{" "}
            <span className="hidden laptop:inline-block">X</span>{" "}
            <span>放大科技創新力</span>
          </h3>
        </div>
        <div className="col-start-1 mt-5 laptop:mt-0 row-start-4 laptop:col-span-3 laptop:row-span-2 laptop:col-start-4 laptop:row-start-2">
          <p className="text-N800/80 leading-6">
            MOPCON（Mobile Open Platform Conference）再度來襲！從 2012
            年開始，我們已經度過 11 個年頭，從 160 人的小型聚會，逐漸成為 1000
            人以上的科技盛宴！MOPCON 集結了獨立開發者、軟體工程師、UI/UX
            設計師、軟體資料科學家、自造者、專業經理人、創業家、相關科系學生等多元背景，在這裡，我們一同探索科技的無限可能，互相啟發、互動交流。
          </p>
          <p className="text-N800/80 leading-6 mt-5">
            MOPCON
            不僅是一場盛會，更是多元資訊技術交流的港口！這裡匯聚了來自不同背景和領域的專業人士，共同分享經驗和知識，拓寬視野，激發創意。2024
            年，我們將以「Inspiration」為主題，深入探討前沿技術的實際應用與跨界整合，從
            AI
            到跨平台、行動應用到雲服務，讓我們一起揮灑創意，共同塑造科技未來的精彩！準備好了嗎？讓我們一起在
            MOPCON 2024 尋找未來世界的敲門磚吧！
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5 laptop:mt-20 col-start-1 row-start-3 laptop:col-span-6 laptop:row-span-2 laptop:row-start-4">
          <h4 className="flex items-center justify-center flex-col font-bold text-black laptop:text-[31px]">
            <span>持續舉辦</span>
            <span className="text-[40px] laptop:text-[80px] text-orange">
              12
            </span>
            <span>年</span>
          </h4>
          <h4 className="flex items-center justify-center flex-col font-bold text-black laptop:text-[31px]">
            <span>精彩議程</span>
            <span className="text-[40px] laptop:text-[80px] bg-gradient-to-r from-orange to-yellow bg-clip-text text-transparent">
              30
            </span>
            <span>場以上</span>
          </h4>
          <h4 className="flex items-center justify-center flex-col font-bold text-black laptop:text-[31px]">
            <span>熱情會眾</span>
            <span className="text-[40px] laptop:text-[80px] text-yellow">
              1000
            </span>
            <span>人以上</span>
          </h4>
        </div>
      </article>
    </section>
  );
};

export default About;
