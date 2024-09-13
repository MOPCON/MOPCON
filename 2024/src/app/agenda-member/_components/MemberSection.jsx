"use client";
import { Fragment } from "react";
import Data from "@/components/data/data.json";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/components/ui/Loading";
import dynamic from "next/dynamic";
import MemberCard from "./Card";
import { useModal } from "@/components/hooks/useModal";
const MemberModal = dynamic(() => import("./Modal"), {
  ssr: false,
  loading: () => <Loading />,
});

const MemberSection = () => {
  const memberModal = useModal();
  return (
    <Fragment>
      <motion.div
        className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-8"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
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
