"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

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

const CloseButton = ({ onClose, className, iconClass }) => {
  return (
    <button
      onClick={onClose}
      className={twMerge(
        "absolute -translate-x-6 translate-y-6 top-0 right-0 p-3",
        className
      )}
      type="button"
      aria-label="Close"
    >
      <IoClose className={twMerge("text-2xl text-white", iconClass)} />
    </button>
  );
};

const ModalBody = ({ children, className }) => {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div
      className={twMerge("bg-white h-full w-full relative", className)}
      onClick={handleContentClick}
    >
      {children}
    </div>
  );
};
const BasicModal = ({ children, onClose, className }) => {
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center w-dvw h-dvh bg-[#0E2219B2]/70"
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

export { ModalBody, BasicModal, CloseButton };
