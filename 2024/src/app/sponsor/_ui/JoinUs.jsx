"use client";
import { motion } from "framer-motion";
import { Speaker, Matchmaking, Brand } from "./icons";
import { twMerge } from "tailwind-merge";

const Card = ({ icon, title, content, className, shadow, border }) => {
  return (
    <motion.div
      className={`rounded-[32px] p-[2px] overflow-clip mx-auto max-w-[352px] ${border}`}
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
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
            <h4 className="font-medium text-[#1C1F25] text-2xl mb-3">
              {title}
            </h4>
            <p className="text-N800/70 text-lg">{content}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const JoinUs = () => {
  return (
    <section className="w-[min(90%,1204px)] mx-auto py-8 tablet:py-16 mb-20">
      <div className="flex items-center gap-3 text-[#AEBECF] mb-5">
        夥伴優勢
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
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h4 className="block-title mb-28">
        加入我們，<span className="text-light-green">最實質的收穫是...</span>
      </h4>
      <motion.div
        className="grid grid-cols-1 tablet:grid-cols-3 grid-flow-row auto-rows-max gap-5 pb-6 tablet:pb-0"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <Card
          icon={<Brand />}
          title="促進徵才媒合"
          content="接觸大量相關領域的高品質人才，大幅提升市場開發及徵才的效率及成功率。"
          className="bg-[linear-gradient(135deg,_#E8EFFA_50%,_#CBD9E5)]"
          shadow="shadow-[0_40px_80px_0_#AEBECF]"
          border="bg-[linear-gradient(135deg,_#FFF_30%,_#90A4B9)]"
        />
        <Card
          icon={<Speaker />}
          title="提升品牌曝光"
          content="透過聚餐和厲害的講者們有更進一步的接觸，奠定日後合作關係。"
          className="bg-[linear-gradient(135deg,_#E4F2F0_50%,_#BDDEDA)]"
          shadow="shadow-[0_40px_80px_0_#96CAC3]"
          border="bg-[linear-gradient(135deg,_#FFF_30%,_#74B4AB)]"
        />
        <Card
          icon={<Matchmaking />}
          title="接觸專業人士"
          content="接觸逾千名參與者的行動科技社群，是推廣服務及產品、曝光品牌的絕佳機會。"
          className="bg-[linear-gradient(135deg,_#F3F7E8_50%,_#E1EBC5)]"
          shadow="shadow-[0_40px_80px_0_#CCDDA0]"
          border="bg-[linear-gradient(135deg,_#FFF_30%,_#BAD07C)]"
        />
      </motion.div>
    </section>
  );
};

export default JoinUs;
