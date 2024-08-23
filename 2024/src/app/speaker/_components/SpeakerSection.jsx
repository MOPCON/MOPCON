"use client";
import React, { useState, Fragment, useMemo } from "react";
import Button from "./Button";
import Data from "@/components/data/data.json";
import SpeakerCard from "./SpeakerCard";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
const SpeakerModal = dynamic(() => import("./SpeakerModal"), { ssr: false });

const SpeakerSection = () => {
  const [tags, setTags] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedSpeakerModal, setSelectedSpeakerModal] = useState(null);

  const handleSpeaker = (speaker) => {
    setSelectedSpeakerModal(speaker);
    document.body.style.overflow = "hidden";
  };

  const handleTag = (tag) => {
    if (tags.map((item) => item.id).includes(tag.id)) {
      setTags(tags.filter((item) => item.id !== tag.id));
    } else {
      setTags([...tags, { ...tag }]);
    }
  };

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
          <Button
            key={item.id}
            onClick={() => handleTag(item)}
            isSelected={tags.map((item) => item.id).includes(item.id)}
            {...item}
          >
            {item.name}
          </Button>
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
                handleClick={() => handleSpeaker(speaker)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selectedSpeakerModal && (
          <SpeakerModal
            {...selectedSpeakerModal}
            onClose={() => {
              setSelectedSpeakerModal(null);
              document.body.style.overflow = "auto";
            }}
          />
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default SpeakerSection;
