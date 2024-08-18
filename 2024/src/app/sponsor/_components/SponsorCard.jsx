"use client";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
const SponsorModal = dynamic(() => import("./Modal"), {
  ssr: false,
});

const SponsorCard = ({ onHover, isHovered, ...sponsorData }) => {
  const [showModal, setShowModal] = useState(false);
  function handleClick() {
    setShowModal(!showModal);
    document.body.style.overflow = showModal ? "auto" : "hidden";
  }

  return (
    <Fragment>
      <div
        className="rounded-[20px] cursor-pointer h-[260px] p-[3px] flex flex-col items-center justify-center relative"
        onClick={handleClick}
        onMouseEnter={() => onHover(sponsorData.id)}
      >
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full p-4 relative z-[1]">
          <div className="overflow-hidden rounded-[50%] border border-white/60">
            <Image
              className="h-full object-contain"
              src={getImageSrc("/img/swiper-default.webp")}
              width={32}
              height={32}
              alt={sponsorData.name}
            />
          </div>
          <span className="text-center font-bold text-[#343844]">
            {sponsorData.name}
          </span>
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
      <AnimatePresence>
        {showModal && (
          <SponsorModal
            sponsorId={sponsorData.id}
            onClose={handleClick}
            sponsorData={sponsorData}
          />
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default SponsorCard;
