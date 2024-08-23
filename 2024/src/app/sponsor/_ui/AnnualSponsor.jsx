"use client";
import SponsorCard from "../_components/SponsorCard";
import SponsorData from "@/components/data/data.json";
import { useState } from "react";
import { SponsorLeaf } from "./icons";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
const SponsorModal = dynamic(() => import("../_components/Modal"), {
  ssr: false,
});
const AnnualSponsorBlock = ({ title, children, onHoverLeave, ...props }) => {
  return (
    <div className="mb-10" onMouseLeave={onHoverLeave}>
      <h3 className="font-bold tablet:text-[31px] text-lg text-black mb-6 relative z-[1] flex items-end gap-3">
        {title}
        <SponsorLeaf isGradient={props.isGradient} fill={props.fill} />
      </h3>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-8">
        {children}
      </div>
    </div>
  );
};

const AnnualSponsor = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectSponsor, setSelectSponsor] = useState(null);

  const handleSponsor = (sponsor) => {
    setSelectSponsor(sponsor);
    document.body.style.overflow = "hidden";
  };

  const handleSponsorClose = () => {
    setSelectSponsor(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="pt-16 w-[min(90%,1204px)] mx-auto">
      <h2 className="block-title mb-[4rem]">2024 年度贊助夥伴</h2>
      {SponsorData?.sponsors.map((item, index) => (
        <AnnualSponsorBlock
          key={index}
          title={item.level}
          onHoverLeave={() => setHoveredIndex(null)}
          {...item}
        >
          {item.companies?.map((sponsor, index) => (
            <SponsorCard
              key={sponsor.id}
              {...sponsor}
              onHover={() => setHoveredIndex(sponsor.id)}
              isHovered={hoveredIndex === sponsor.id}
              onClick={() => handleSponsor(sponsor)}
            />
          ))}
        </AnnualSponsorBlock>
      ))}
      <AnimatePresence>
        {selectSponsor && (
          <SponsorModal
            sponsorId={selectSponsor.id}
            onClose={handleSponsorClose}
            sponsorData={selectSponsor}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AnnualSponsor;
