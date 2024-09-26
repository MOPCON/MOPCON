"use client";

import TimeMachineCard from "../_components/TimeMachineCard";
import { ArrowRight, ArrowLeft } from "./SwiperArrow";
import timeMachineData from "@/components/data/timeMachine.json";
import { useState, useRef, Fragment } from "react";
import { AnimatePresence } from "framer-motion";

const TimeMachineBlock = () => {
  const [timeContent, setTimeContent] = useState(timeMachineData[0]);

  return (
    <Fragment>
      <div className="flex flex-col-reverse tablet:flex-col">
        <AnimatePresence mode="wait">
          <TimeMachineCard key={timeContent.year} data={timeContent} />
        </AnimatePresence>
        <div className="relative tablet:w-1/2 tablet:mx-auto p-2 mb-8 [mask-image:linear-gradient(90deg,_transparent_0%,_#fff_30%,_#fff_70%,_transparent_100%)] tablet:[mask-image:none]">
          <button
            type="button"
            className="swiper-button-prev time-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full p-4 hidden tablet:inline-block"
            aria-label="Previous Slide"
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="swiper-button-next time-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-full p-4 hidden tablet:inline-block"
            aria-label="Next Slide"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default TimeMachineBlock;
