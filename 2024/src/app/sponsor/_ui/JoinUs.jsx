"use client";
import { motion } from "framer-motion";
import { Speaker, Matchmaking, Brand } from "./icons";
import { twMerge } from "tailwind-merge";
import { fadeInAnimation } from "@/components/util/animation";
import { SectionBlock, SectionTitle } from "@/components/ui/SectionBlock";

const Card = ({ icon, title, content, className, shadow, border, index }) => {
  return (
    <motion.div
      className={`rounded-[32px] p-[2px] overflow-clip mx-auto max-w-[352px] ${border}`}
      variants={fadeInAnimation(0.15)}
      initial="initial"
      whileInView="show"
      viewport={{ once: true }}
      custom={index}
    >
      <div
        className={twMerge(
          "flex items-center rounded-[30px] justify-center p-9 backdrop-blur-sm w-full",
          className
        )}
      >
        <div className={`rounded-3xl bg-white py-4 px-6 ${shadow}`}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center size-32">
              {icon}
            </div>
            <h4 className="font-medium text-[#1C1F25] text-lg tablet:text-2xl mb-3">
              {title}
            </h4>
            <p className="text-N800/70 tablet:text-lg">{content}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const JoinUs = () => {
  return (
    <SectionBlock className="mb-20">
      <div className="w-[min(90%,1204px)] mx-auto">
        <SectionTitle arrowTitle="夥伴優勢" className="mb-14 tablet:mb-28">
          加入我們，<span className="text-light-green">最實質的收穫是...</span>
        </SectionTitle>
        <div className="grid grid-cols-1 tablet:grid-cols-3 grid-flow-row auto-rows-max gap-y-14 gap-5 pb-6 tablet:pb-0">
          <Card
            icon={<Brand />}
            title="促進徵才媒合"
            content="接觸大量相關領域的高品質人才，大幅提升市場開發及徵才的效率及成功率。"
            className="bg-[linear-gradient(135deg,_#E8EFFA_50%,_#CBD9E5)]"
            shadow="shadow-[0_40px_80px_0_#AEBECF]"
            border="bg-[linear-gradient(135deg,_#FFF_30%,_#90A4B9)]"
            index={0}
          />
          <Card
            icon={<Speaker />}
            title="提升品牌曝光"
            content="透過聚餐和厲害的講者們有更進一步的接觸，奠定日後合作關係。"
            className="bg-[linear-gradient(135deg,_#E4F2F0_50%,_#BDDEDA)]"
            shadow="shadow-[0_40px_80px_0_#96CAC3]"
            border="bg-[linear-gradient(135deg,_#FFF_30%,_#74B4AB)]"
            index={1}
          />
          <Card
            icon={<Matchmaking />}
            title="接觸專業人士"
            content="接觸逾千名參與者的行動科技社群，是推廣服務及產品、曝光品牌的絕佳機會。"
            className="bg-[linear-gradient(135deg,_#F3F7E8_50%,_#E1EBC5)]"
            shadow="shadow-[0_40px_80px_0_#CCDDA0]"
            border="bg-[linear-gradient(135deg,_#FFF_30%,_#BAD07C)]"
            index={2}
          />
        </div>
      </div>
    </SectionBlock>
  );
};

export default JoinUs;
