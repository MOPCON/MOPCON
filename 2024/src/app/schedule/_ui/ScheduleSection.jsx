"use client";
import React, { useState } from "react";
import DaySwitchButton from "../components/DaySwitchButton";
import CategoryButton from "@/components/CategoryButton";
import Data from "@/components/data/data.json";
import { motion } from "framer-motion";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import Schedule from "../components/Schedule";
import scheduleData from "@/components/data/schedule.json";
import { SectionTitle, SectionBlock } from "@/components/ui/SectionBlock";

const ScheduleSection = () => {
  const [tags, setTags] = useState([]);
  const [schedules, setSchedules] = useState([scheduleData[0]]);
  const [activeDay, setActiveDay] = useState(0);

  const handleTag = (tag) => {
    if (tags.map((item) => item.id).includes(tag.id)) {
      setTags(tags.filter((item) => item.id !== tag.id));
    } else {
      setTags([...tags, { ...tag }]);
    }
  };

  const handleDay = (day) => {
    setSchedules([scheduleData[day]]);
    setActiveDay(day);
  };

  return (
    <SectionBlock className="bg-[#F4F7FA]">
      <Image
        src={getImageSrc("/community/bg-wave.svg")}
        alt="behavioral-guidelines-bg"
        width={1920}
        height={1080}
        className="absolute w-full h-full object-cover left-1/2 top-0 -translate-x-1/2 translate-y-1/3 pointer-events-none"
        aria-hidden="true"
      />
      <div className="w-[min(90%,1062px)] mx-auto">
        <SectionTitle arrowTitle="議程表" className="mb-10">
          精彩議程
        </SectionTitle>
      </div>
      <div className="w-[min(90%,1280px)] mx-auto">
        <DaySwitchButton handleDays={handleDay} activeDay={activeDay} />
        <motion.div
          className="flex items-center flex-wrap justify-center gap-3 mb-[60px]"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {Data.speakerTags.map((item, i) => (
            <CategoryButton
              key={item.id}
              onClick={() => handleTag(item)}
              isSelected={tags.map((item) => item.id).includes(item.id)}
              {...item}
            >
              {item.name}
            </CategoryButton>
          ))}
        </motion.div>
        <Schedule {...schedules} />
      </div>
    </SectionBlock>
  );
};

export default ScheduleSection;
