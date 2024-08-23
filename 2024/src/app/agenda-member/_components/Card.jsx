"use client";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { motion, AnimatePresence } from "framer-motion";

import SocialLinks from "./SocialLinks";

const MemberCard = ({ isHovered, onHover, handleClick, ...props }) => {
  return (
    <motion.div
      className="rounded-[20px] cursor-pointer h-[400px] p-[3px] flex flex-col items-center justify-center relative"
      onClick={handleClick}
      onMouseEnter={onHover}
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0 },
      }}
      exit={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full p-4 relative z-[1]">
        <div className="overflow-hidden rounded-[50%] border border-white/60">
          <Image
            className="h-full object-contain"
            src={getImageSrc("/img/swiper-default.webp")}
            width={120}
            height={120}
            alt={props.name}
          />
        </div>
        <h5 className="text-center font-bold text-N800 text-xl">
          {props.name}
        </h5>
        <span className="text-center text-N800 mb-6 block">
          {props.company}/{props.jobTitle}
        </span>
        <div className="flex flex-wrap gap-3 items-center">
          <SocialLinks speaker={props} />
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
    </motion.div>
  );
};

export default MemberCard;
