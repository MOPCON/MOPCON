"use client";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { motion } from "framer-motion";
const SpeakerCard = ({ handleClick, ...speakerData }) => {
  return (
    <motion.div
      className="rounded-[20px] cursor-pointer min-h-[400px] h-full p-[3px] flex flex-col items-center justify-center relative transition-all duration-300 hover:shadow-[0_10px_30px_0_rgba(0,0,0,0.05)]"
      onClick={handleClick}
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0 },
      }}
      exit={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full p-4 relative z-[1]">
        <div className="overflow-hidden size-[120px] rounded-[50%] border border-white/60 shrink-0">
          <Image
            className="h-full w-full object-cover"
            src={getImageSrc(speakerData.img || "/img/swiper-default.webp")}
            width={120}
            height={120}
            alt={speakerData.name}
          />
        </div>
        <h5 className="text-center font-bold text-N800 text-xl">
          {speakerData.name}
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
    </motion.div>
  );
};

export default SpeakerCard;
