import React from "react";
import CategoryButton from "./ui/CategoryButton";
import Data from "@/components/data/data.json";
import { motion } from "framer-motion";

const CategoryButtons = ({ ...props }) => {
  return (
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
          onClick={() => props.handleTag(item)}
          isSelected={props.tags.map((item) => item.id).includes(item.id)}
          {...item}
        >
          {item.name}
        </CategoryButton>
      ))}
    </motion.div>
  );
};

export default CategoryButtons;
