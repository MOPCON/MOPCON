"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.main
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="overflow-x-hidden"
    >
      {children}
    </motion.main>
  );
}
