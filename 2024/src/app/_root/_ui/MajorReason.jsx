"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
import { fadeInAnimation } from "@/components/util/animation";
import { motion } from "framer-motion";
import { SectionTitle, SectionBlock } from "@/components/ui/SectionBlock";

const REASONS = [
  {
    id: 1,
    titleNum: "1",
    title: "次齊聚大神開講",
    content:
      "從 AI 到 Web3，從 UI/UX 到雲端技術，Mopcon 2024 將像世界樹一樣，深深扎根於多領域的技術土壤，帶來 33 場次的精彩講座與討論（包含 3 場 Keynote 和 2 場 Panel）。在這裡，你將吸收最新的技術養分，讓自己在變幻莫測的科技森林中找到未來的方向！",
  },
  {
    id: 2,
    titleNum: "2",
    title: "天認識新朋友",
    content:
      "在茫茫科技森林中獨行？不如在 Mopcon 2024 找到屬於你的群體，與志同道合的開發者、設計師和創業家們共同成長。我們的社群擁有豐富的 Lightning Talk 和 BoF 活動，就像世界樹的枝幹一樣相互連結，共同促進技術與創意的交流與提升。",
  },
  {
    id: 3,
    titleNum: "3+",
    title: "個未來新機會",
    content:
      "在 Mopcon 2024，你將與來自各界的企業交流，找到新工作、合作機會、產品服務甚至靈感。每次互動都像是攀上世界樹的枝葉，開花結果，為你的未來帶來無限可能！",
  },
];

const ReasonItem = ({ title, content, idx, titleNum, index }) => {
  return (
    <motion.div
      className="relative pb-20"
      variants={fadeInAnimation(0.3, 0.5)}
      initial="initial"
      whileInView="show"
      viewport={{ once: true }}
      custom={index}
    >
      <h6 className="mb-4 font-medium flex gap-2 w-fit items-baseline bg-gradient-to-r from-secondary to-light-green bg-clip-text text-transparent">
        <span className="text-[32px] tablet:text-[40px]">{titleNum}</span>
        <span className="text-lg tablet:text-2xl">{title}</span>
      </h6>
      <p className="text-N800/80  tablet:text-lg">{content}</p>
      <div className="absolute font-light bottom-0 right-0 text-[#AEBECF]/40 text-8xl">
        0{idx}
      </div>
    </motion.div>
  );
};

export async function getStaticProps() {
  const now = new Date();
  const targetDate = new Date("2024-10-26");
  const timeDiff = targetDate.getTime() - now.getTime();
  const initialDaysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return {
    props: {
      initialDaysLeft,
    },
    revalidate: 43200,
  };
}

const MajorReason = ({ initialDaysLeft }) => {
  const [daysLeft, setDaysLeft] = useState(initialDaysLeft);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const now = new Date();
      const targetDate = new Date("2024-10-26");
      const timeDiff = targetDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDaysLeft(daysDiff);
    };

    calculateDaysLeft();

    const timer = setInterval(calculateDaysLeft, 1000 * 60 * 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <SectionBlock className="bg-[#F4F7FA]">
      <Image
        src={getImageSrc("/bg-dots.svg")}
        aria-hidden="true"
        alt="bg dots"
        width={133}
        height={96}
        className="absolute top-0 left-0 pointer-events-none translate-y-32 hidden laptop:block"
      />
      <div className="w-[min(90%,1062px)] mx-auto">
        <SectionTitle arrowTitle="選擇我們">
          三大不能錯過 <span className="text-light-green">MOPCON 2024</span>{" "}
          的理由
        </SectionTitle>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] justify-between gap-y-4 gap-x-12 mb-20">
          {REASONS.map((reason, idx) => (
            <ReasonItem
              key={reason.id}
              title={reason.title}
              content={reason.content}
              idx={reason.id}
              titleNum={reason.titleNum}
              index={idx}
            />
          ))}
        </div>
        <div className="flex items-end pt-20 gap-y-4 border-t flex-wrap border-[#E7E9ED]">
          <div className="flex-grow">
            <h5 className="block-title text-secondary font-bold mb-3">
              活動倒數 {daysLeft} 天
            </h5>
            <h6 className="font-medium text-lg tablet:text-2xl text-[#161C2D]/70">
              還等什麼呢？趕快購票入場吧！
            </h6>
          </div>
          <Link
            className="btn btn-primary"
            href="https://mopcon.kktix.cc/events/2024-students"
            target="_blank"
            rel="noreferrer noopener"
          >
            前往購票
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </SectionBlock>
  );
};

export default MajorReason;
