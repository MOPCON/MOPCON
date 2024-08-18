"use client";
import { Bus, MRT, HSR, LightRail } from "@/app/home/_ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const Card = ({ icon, title, content, idx }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const iconMapping = {
    bus: Bus,
    mrt: MRT,
    hsr: HSR,
    lightrail: LightRail,
  };

  const IconComponent = iconMapping[icon.toLowerCase()];

  return (
    <div
      className="py-3 px-0 tablet:px-3"
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="group w-full h-full block rounded-xl px-5 py-4 relative">
        <AnimatePresence>
          {idx === hoveredIndex && (
            <motion.div
              className="absolute inset-0 w-full h-full border border-secondary block rounded-xl shadow-[0_2px_6px_0_rgba(156,188,67,0.3),0_13px_12px_0_rgba(156,188,67,0.05),0_24px_15px_0_rgba(156,188,67,0.05),0_40px_16px_0_rgba(156,188,67,0.05),0_62px_17px_0_rgba(156,188,67,0.05)]"
              layoutId="border"
              layout="position"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                layout: { duration: 0.8, type: "spring" },
              }}
            />
          )}
        </AnimatePresence>
        <div className="font-bold text-lg text-black flex items-center gap-2 transition-colors duration-300 group-hover:text-secondary">
          {IconComponent && (
            <IconComponent className="stroke-black group-hover:stroke-secondary transition-colors duration-300" />
          )}
          {title}
        </div>
        <p className="text-N800/80 leading-6">{content}</p>
      </div>
    </div>
  );
};

export default Card;
