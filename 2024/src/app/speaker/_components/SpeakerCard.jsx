"use client";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
const SpeakerCard = ({ isHovered, onHover, ...speakerData }) => {
  return (
    <div
      className="rounded-[20px] cursor-pointer min-h-[400px] h-full p-[3px] flex flex-col items-center justify-center relative"
      onMouseEnter={onHover}
    >
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full p-4 relative z-[1]">
        <div className="overflow-hidden rounded-[50%] border border-white/60 shrink-0">
          <Image
            className="h-full object-contain"
            src={getImageSrc("/img/swiper-default.webp")}
            width={120}
            height={120}
            alt={speakerData.name}
          />
        </div>
        <h5 className="text-center font-bold text-N800 text-xl before:inset-0 before:absolute">
          <Link
            href={`/speaker/${speakerData.speakerId}`}
            className="before:inset-0 before:absolute z-[1]"
          >
            {speakerData.name}
          </Link>
        </h5>
        <span className="text-center text-N800 mb-6 block">
          {speakerData.company}/{speakerData.jobTitle}
        </span>
        <div className="flex flex-wrap gap-3 items-center justify-center">
          {speakerData.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-secondary border-2 border-secondary px-3 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute p-[3px] rounded-[20px] inset-0 w-full h-full bg-[linear-gradient(-80deg,_#9CBC43_50%,_#4C766D)] block "
            layoutId="animated-bg"
            layout="true"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              layout: { duration: 0.5, type: "spring" },
            }}
          >
            <div className="rounded-[calc(20px-3px)] w-full h-full bg-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpeakerCard;
