"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "@/components/util/animation";
const Introduction = ({ ...props }) => {
  return (
    <motion.h4
      className="flex items-center justify-center flex-col font-bold text-[#161C2D]/70"
      variants={fadeInAnimation(0.1)}
      initial="initial"
      whileInView="show"
      viewport={{ once: true }}
      custom={props.index}
    >
      <span className="text-xl tablet:text-2xl">{props.title}</span>
      <span className="text-[64px] laptop:text-[80px] text-[#161C2D]">
        {props.num}
      </span>
      <span className="text-xl tablet:text-2xl">{props.unit}</span>
    </motion.h4>
  );
};

export default Introduction;
