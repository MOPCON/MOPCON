"use client";
import { Fragment } from "react";
import Data from "@/components/data/data.json";
import { motion, AnimatePresence } from "framer-motion";
import MemberCard from "./Card";
import MemberModal from "./Modal";
import { useModal } from "@/components/hook/useModal";

const MemberSection = () => {
  const memberModal = useModal();
  return (
    <Fragment>
      <motion.div
        className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-8"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {Data.agendaMember.map((item, i) => (
          <MemberCard
            key={i}
            idx={item.memberId}
            {...item}
            handleClick={() => memberModal.openModal(item)}
          />
        ))}
      </motion.div>
      <AnimatePresence>
        {memberModal.content && memberModal.isOpen && (
          <MemberModal
            onClose={() => memberModal.closeModal()}
            {...memberModal.content}
          />
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default MemberSection;
