"use client";
import { useState } from "react";
import Data from "@/components/data/data.json";
import { motion } from "framer-motion";
import MemberCard from "./Card";

const MemberSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <motion.div
      className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-8"
      onMouseLeave={() => setHoveredIndex(null)}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
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
    </motion.div>
  );
};

export default MemberSection;
