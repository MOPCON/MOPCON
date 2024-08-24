"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { Speaker, Matchmaking, Brand } from "./icons";

const Card = ({ icon, title, content }) => {
  return (
    <motion.div
      className="flex gap-3 rounded-2xl p-2 pr-4 border border-white/20 bg-white/20 backdrop-blur-sm w-full relative z-[1]"
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center flex-shrink-0 bg-white/5 rounded-xl p-3 backdrop-blur-sm basis-[84px] min-h-[84px]">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-white text-lg leading-7 tablet:mb-1">
          {title}
        </h4>
        <p className="text-white/70 leading-6">{content}</p>
      </div>
    </motion.div>
  );
};

const JoinUs = () => {
  return (
    <section className="w-[min(100%,1204px)] mx-auto py-8 tablet:py-16 mb-20">
      <div className="max-w-[90%] mx-auto flex flex-col items-center">
        <h2 className="block-title mb-5">想加入我們嗎？</h2>
        <p className="font-medium text-lg tablet:text-xl text-black underline decoration-1 underline-offset-4 mb-10 tablet:mb-20">
          想了解成為贊助夥伴會有什麼樣的優勢嗎？
        </p>
      </div>
      <div className="tablet:rounded-[2rem] overflow-clip bg-[linear-gradient(80deg,_#364758_15%,_#4C766D_50%)] p-[clamp(2rem,_-1.625rem+_10vw,_5rem)] relative mb-20">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-10">
          <h3 className="text-white font-bold text-2xl tablet:text-[31px] flex flex-col gap-3 tablet:block">
            加入我們，<span>最實質的收穫是...</span>
          </h3>
          <motion.div
            className="grid grid-cols-1 grid-flow-row auto-rows-max gap-5 pb-6 tablet:pb-0"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
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
          </motion.div>
        </div>
        <Image
          width={500}
          height={500}
          src={getImageSrc("/sponsor/join-us-bg.webp")}
          alt="bg-img"
          className="absolute w-10/12 h-full object-cover bottom-0 left-0 translate-y-[25%] [mask-image:linear-gradient(25deg,_#fff_-50%,_transparent_70%)] pointer-events-none brightness-0 invert"
        />
      </div>
    </section>
  );
};

export default JoinUs;
