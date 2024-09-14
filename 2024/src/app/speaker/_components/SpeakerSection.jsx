"use client";
import React, { useState, Fragment, useMemo, useEffect } from "react";
import Data from "@/components/data/data.json";
import SpeakerCard from "./SpeakerCard";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useModal } from "@/components/hooks/useModal";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/ui/Loading";
import CategoryButtons from "@/components/CategoryButtons";
import useSelectedTag from "@/components/hooks/useSelectedTag";

const SpeakerModal = dynamic(() => import("./SpeakerModal"), {
  ssr: false,
  loading: () => <Loading />,
});

const SpeakerSection = () => {
  const { tags, handleTag } = useSelectedTag();
  const speakerModal = useModal();
  const router = useRouter();
  const pathname = useSearchParams();

  const selectedTags = (tag) => {
    handleTag(tag);
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
  function handlerModalClose() {
    speakerModal.closeModal();
    router.push("/speaker", { scroll: false });
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
      <CategoryButtons handleTag={selectedTags} tags={tags} />
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-8">
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
            onClose={() => handlerModalClose()}
          />
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default SpeakerSection;
