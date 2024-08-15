"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { createPortal } from "react-dom";

const backdropVariants = {
  open: {
    opacity: 1,
    visibility: "visible",
  },
  closed: {
    opacity: 0,
    visibility: "hidden",
  },
};
const modalVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    y: 50,
    transition: {
      type: "spring",
      stiffness: 80,
    },
  },
};
const BasicModal = ({ children, onClose, className }) => {
  return createPortal(
    <motion.div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] flex items-center justify-center w-screen h-screen bg-black/70"
      onClick={onClose}
      variants={backdropVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <motion.div
        className={`${twMerge(
          "flex w-[min(95%,905px)] h-[600px] items-center justify-center rounded-[54px] p-[3px] bg-[linear-gradient(-80deg,_#9CBC43_50%,_#4C766D)]",
          className
        )}`}
        variants={modalVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {children}
      </motion.div>
    </motion.div>,
    document.getElementById("modal-root")
  );
};

export default BasicModal;
