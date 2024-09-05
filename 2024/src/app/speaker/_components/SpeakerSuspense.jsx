"use client";
import React from "react";
import { Suspense } from "react";
import SpeakerSection from "./SpeakerSection";

const SpeakerSuspense = () => {
  return (
    <Suspense>
      <SpeakerSection />
    </Suspense>
  );
};

export default SpeakerSuspense;
