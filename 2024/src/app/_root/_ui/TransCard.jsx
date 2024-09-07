"use client";
import { Bus, MRT, HSR, LightRail } from "./icons";

import { motion } from "framer-motion";

const Card = ({ icon, title, content, bgColor, index }) => {
  const iconMapping = {
    bus: Bus,
    mrt: MRT,
    hsr: HSR,
    lightrail: LightRail,
  };

  const IconComponent = iconMapping[icon.toLowerCase()];

  return (
    <motion.div
      className="size-full block rounded-xl"
      variants={{
        initial: {
          opacity: 0,
          y: 25,
        },
        show: (index) => ({
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.2, duration: 0.5 },
        }),
      }}
      initial="initial"
      whileInView="show"
      viewport={{ once: true }}
      custom={index}
    >
      <div className="flex items-center gap-5">
        <div
          className={`flex-shrink-0 rounded-2xl size-[72px] flex items-center justify-center ${bgColor}`}
        >
          {IconComponent && <IconComponent />}
        </div>
        <div className="text-N800 flex-grow">
          <h6 className="text-lg tablet:text-2xl font-medium mb-2">{title}</h6>
          <p className="text-base tablet:text-lg">{content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
