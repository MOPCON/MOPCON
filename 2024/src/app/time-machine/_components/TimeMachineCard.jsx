import Link from "next/link";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { motion } from "framer-motion";
import { opacityAnimation } from "@/components/util/animation";

const TimeMachineCard = ({ data }) => {
  return (
    <motion.section
      variants={opacityAnimation(0.3)}
      initial="initial"
      exit={"initial"}
      animate="show"
      viewport={{ once: true }}
      data-year={data.year}
      className="mb-14"
    >
      <h3 className="text-xl laptop:text-2xl desktop:text-[32px] font-bold text-secondary mb-2">
        {data.year}
      </h3>
      <Link
        className="mb-6 flex items-baseline gap-2 text-light-green text-lg laptop:text-xl desktop:text-2xl"
        href={data.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {data.title}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 10.8889V16.2222C18 16.6937 17.8127 17.1459 17.4793 17.4793C17.1459 17.8127 16.6937 18 16.2222 18H3.77778C3.30628 18 2.8541 17.8127 2.5207 17.4793C2.1873 17.1459 2 16.6937 2 16.2222V3.77778C2 3.30628 2.1873 2.8541 2.5207 2.5207C2.8541 2.1873 3.30628 2 3.77778 2H9.11111M18 2L10 10M18 2H12.6667M18 2V7.33333"
            stroke="#9BBC43"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      {data.subtitle && (
        <h4 className="laptop:text-lg text-N800 mb-6">{data.subtitle}</h4>
      )}
      <p className="laptop:text-lg text-N800 mb-12">{data.content}</p>
      <div className="overflow-clip flex items-center justify-center rounded-2xl laptop:rounded-3xl desktop:rounded-[40px] shadow-[10px_20px_50px_rgba(0,0,0,0.15)] h-[262px] tablet:h-[420px] laptop:h-[500px] desk:h-[700px]">
        <Image
          src={getImageSrc(data.image || "/img/2023-mopcon.webp")}
          alt="time-machine"
          className="w-full h-full object-cover"
          width={1062}
          height={700}
        />
      </div>
    </motion.section>
  );
};

export default TimeMachineCard;
