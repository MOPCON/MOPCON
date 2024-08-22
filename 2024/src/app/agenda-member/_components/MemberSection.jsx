"use client";
import { useState, Fragment } from "react";
import Data from "@/components/data/data.json";
import { motion, AnimatePresence } from "framer-motion";
import MemberCard from "./Card";

const MemberSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-8"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {Data.agendaMember.map((item, i) => (
        <MemberCard
          key={i}
          idx={item.memberId}
          onHover={() => setHoveredIndex(item.memberId)}
          isHovered={hoveredIndex === item.memberId}
          {...item}
        />
      ))}
    </div>
  );
};

export default MemberSection;
