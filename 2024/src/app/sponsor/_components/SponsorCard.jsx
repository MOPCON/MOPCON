"use client";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { useState, Fragment } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
const SponsorModal = dynamic(() => import("./Modal"), {
  ssr: false,
});

const SponsorCard = ({ ...sponsorData }) => {
  const [showModal, setShowModal] = useState(false);
  function handleClick() {
    setShowModal(!showModal);
    document.body.style.overflow = showModal ? "auto" : "hidden";
  }

  return (
    <Fragment>
      <div
        className="rounded-[20px] cursor-pointer h-[260px] p-[3px] flex flex-col items-center justify-center hover:bg-[linear-gradient(-80deg,_#9CBC43_50%,_#4C766D)]"
        onClick={handleClick}
      >
        <div className="bg-white rounded-[calc(20px-3px)] flex flex-col items-center justify-center w-full h-full">
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
