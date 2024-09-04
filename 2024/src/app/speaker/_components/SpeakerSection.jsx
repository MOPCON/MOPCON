"use client";
import React, { useState, Fragment, useMemo, useEffect } from "react";
import CategoryButton from "@/components/CategoryButton";
import Data from "@/components/data/data.json";
import SpeakerCard from "./SpeakerCard";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useModal } from "@/components/hook/useModal";
const SpeakerModal = dynamic(() => import("./SpeakerModal"), { ssr: false });
import { useRouter, useSearchParams } from "next/navigation";

const SpeakerSection = () => {
  const [tags, setTags] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const speakerModal = useModal();
  const router = useRouter();
  const pathname = useSearchParams();

  const handleTag = (tag) => {
    if (tags.map((item) => item.id).includes(tag.id)) {
      setTags(tags.filter((item) => item.id !== tag.id));
    } else {
      setTags([...tags, { ...tag }]);
    }
  };

  useEffect(() => {
    if (pathname.get("id")) {
      const id = pathname.get("id");
      const speaker = Data.speakers.find(
        (speaker) => String(speaker.sessionId) === id
      );
      if (!speaker) return;
      speakerModal.openModal(speaker);
    }
    return () => {
      speakerModal.closeModal();
    };
  }, [pathname]);

  function handlerCardClick(speaker) {
    speakerModal.openModal(speaker);
    router.push(`/speaker/?id=${speaker.sessionId}`, { scroll: false });
  }

  const selectedTypeSpeaker = useMemo(() => {
    return Data.speakers.filter((speaker) =>
      tags.every((tag) =>
        speaker.tags.some((speakerTag) => speakerTag.id === tag.id)
      )
    );
  }, [tags]);

  return (
    <Fragment>
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
      <div
        className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-8"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {selectedTypeSpeaker.map((speaker) => (
            <motion.div
              key={speaker.speakerId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <SpeakerCard
                {...speaker}
                onHover={() => setHoveredIndex(speaker.speakerId)}
                isHovered={hoveredIndex === speaker.speakerId}
                handleClick={() => handlerCardClick(speaker)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {speakerModal.content && speakerModal.isOpen && (
          <SpeakerModal
            {...speakerModal.content}
            onClose={() => speakerModal.closeModal()}
          />
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default SpeakerSection;
