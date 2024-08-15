import React from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { Speaker, Matchmaking, Brand, Leaf } from "./icons";

const Card = ({ icon, title, content }) => {
  return (
    <div className="flex gap-3 rounded-2xl p-2 pr-4 border border-white/20 bg-white/20 backdrop-blur-3xl w-full">
      <div className="flex items-center justify-center flex-shrink-0 bg-white/10 rounded-xl p-3 backdrop-blur-3xl basis-[84px] min-h-[84px]">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-white text-lg leading-7 mb-1">
          {title}
        </h4>
        <p className="text-white/70 leading-6">{content}</p>
      </div>
    </div>
  );
};

const JoinUs = () => {
  return (
    <section className="w-[min(90%,1204px)] mx-auto py-16 mb-20">
      <h2 className="block-title mb-5 text-center">想加入我們嗎？</h2>
      <p className="font-medium mt-5 text-xl text-black underline decoration-1 underline-offset-4 text-center mb-20">
        想了解成為贊助夥伴會有什麼樣的優勢嗎？
      </p>
      <div className="rounded-[2rem] overflow-clip bg-[linear-gradient(70deg,_#364758_-20%,_#4C766D_50%)] p-[clamp(1rem,_-1.625rem+_10vw,_5rem)] relative mb-20">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-10">
          <h3 className="text-white font-bold text-[31px]">
            加入我們，最實質的收穫是...
          </h3>
          <div className="grid grid-cols-1 grid-flow-row auto-rows-max gap-5">
            <Card
              icon={<Brand />}
              title="品牌曝光"
              content="接觸逾千名參與者的行動科技社群，是推廣服務及產品、曝光品牌的絕佳機會。"
            />
            <Card
              icon={<Speaker />}
              title="與講者接觸"
              content="透過聚餐和厲害的講者們有更進一步的接觸，奠定日後合作關係。"
            />
            <Card
              icon={<Matchmaking />}
              title="徵才媒合"
              content="接觸大量相關領域的高品質人才，大幅提升市場開發及徵才的效率及成功率。"
            />
          </div>
        </div>
        <Image
          width={500}
          height={500}
          src={getImageSrc("/sponsor/join-us-bg.png")}
          alt="bg-img"
          className="absolute w-10/12 h-full object-cover bottom-0 left-0 translate-y-[25%] [mask-image:linear-gradient(25deg,_#fff_-50%,_transparent_70%)] pointer-events-none"
        />
      </div>
      <div className="max-w-[530px] mx-auto flex flex-col justify-center items-center">
        <p className="mb-5 text-center text-N800">
          謝謝你願意成為全台最大行動科技領域社群研討會的參與者及貢獻者之一！
        </p>
        <button className="btn btn-primary flex items-center gap-3 group">
          <Leaf className="stroke-white group-hover:stroke-secondary" />
          我要贊助
        </button>
      </div>
    </section>
  );
};

export default JoinUs;
