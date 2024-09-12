"use client";
import { motion, AnimatePresence } from "framer-motion";

const DaySwitchButton = ({ handleDays, activeDay }) => {
  return (
    <div className="flex text-xl font-medium w-fit mx-auto items-center justify-center overflow-clip rounded-full bg-[#E8EFFA] text-N800 h-[70px] mb-14">
      <button
        className={`flex p-5 h-full items-center justify-center border-2 transition-all duration-500 border-r border-[#90A4B9] relative rounded-l-full ${
          activeDay === 0 ? "bg-[#90A4B9] text-white" : ""
        }`}
        onClick={() => handleDays(0)}
      >
        <span className="relative z-[1]">10/26（六）</span>
        <AnimatePresence>
          {activeDay === 0 && (
            <motion.div
              className="absolute p-[3px] inset-0 size-full bg-[#90A4B9]"
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
            />
          )}
        </AnimatePresence>
      </button>
      <button
        className={`flex p-5 h-full items-center justify-center border-2 border-l transition-all duration-500 border-[#90A4B9] relative rounded-r-full  ${
          activeDay === 1 ? "bg-[#90A4B9] text-white" : ""
        }`}
        onClick={() => handleDays(1)}
      >
        <span className="relative z-[1]">10/27（日）</span>
        <AnimatePresence>
          {activeDay === 1 && (
            <motion.div
              className="absolute p-[3px] inset-0 size-full bg-[#90A4B9]"
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
            />
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default DaySwitchButton;
