"use client";
import { FaCircleCheck } from "react-icons/fa6";
import { motion } from "framer-motion";

const CategoryButton = ({ children, ...props }) => {
  return (
    <motion.button
      type="button"
      className={`rounded-full text-white py-2 px-4 flex items-center gap-2 hover:bg-light-green transition-colors duration-150 ${
        props.isSelected ? "bg-light-green" : "bg-secondary"
      }`}
      onClick={props.onClick}
      aria-label={props.name}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
      exit={{ opacity: 1 }}
      transition={{ type: "spring" }}
      whileTap={{ scale: 0.9 }}
    >
      {props.isSelected && <FaCircleCheck className="text-secondary/60" />}
      {children}
    </motion.button>
  );
};

export default CategoryButton;
