"use client";
import React, { useState, Fragment } from "react";
import Button from "./Button";
import Data from "@/components/data/data.json";
import SpeakerCard from "./SpeakerCard";
import { motion, AnimatePresence } from "framer-motion";

const SpeakerSection = () => {
  const [tags, setTags] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleTag = (tag) => {
    if (tags.map((item) => item.id).includes(tag.id)) {
      setTags(tags.filter((item) => item.id !== tag.id));
    } else {
      setTags([...tags, { ...tag }]);
    }
  };

  const selectedSpeaker = Data.speakers.filter((speaker) =>
    tags.every((tag) =>
      speaker.tags.some((speakerTag) => speakerTag.id === tag.id)
    )
  );

  return (
    <Fragment>
      <div className="flex items-center flex-wrap justify-center gap-3 mb-[60px]">
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
      </div>
      <div
        className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-8"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {selectedSpeaker.map((speaker) => (
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
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Fragment>
  );
};

export default SpeakerSection;
