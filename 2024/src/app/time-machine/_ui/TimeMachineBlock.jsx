"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { SectionBlock, SectionTitle } from "@/components/ui/SectionBlock";
import TimeMachineCard from "../_components/TimeMachineCard";
import { ArrowRight, ArrowLeft } from "./SwiperArrow";
import timeMachineData from "@/components/data/timeMachine.json";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";

const TimeMachineBlock = () => {
  const [timeContent, setTimeContent] = useState(timeMachineData[0]);
  const swiperRef = useRef(null);
  const swiperChangeHandler = (swiper) => {
    setTimeContent(timeMachineData[swiper.realIndex]);
  };
  const handleSlideClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  };
  return (
    <SectionBlock>
      <div className="w-[min(90%,1062px)] mx-auto mb-10 tablet:mb-14 laptop:mb-20">
        <SectionTitle arrowTitle="HISTORY" className="mb-20">
          歷年 MOPCON
        </SectionTitle>
        <div className="flex flex-col-reverse tablet:flex-col">
          <AnimatePresence mode="wait">
            <TimeMachineCard key={timeContent.year} data={timeContent} />
          </AnimatePresence>
          <div className="relative tablet:w-1/2 tablet:mx-auto p-2 mb-8 [mask-image:linear-gradient(90deg,_transparent_0%,_#fff_30%,_#fff_70%,_transparent_100%)] tablet:[mask-image:none]">
            <Swiper
              ref={swiperRef}
              slidesPerView={5}
              centeredSlides={true}
              speed={440}
              loop={true}
              navigation={{
                nextEl: `.time-next`,
                prevEl: `.time-prev`,
              }}
              onSlideChange={(swiper) => {
                swiperChangeHandler(swiper);
              }}
              breakpointsBase="container"
              spaceBetween={24}
              modules={[Navigation]}
              on={{}}
            >
              {timeMachineData.map((item, index) => (
                <SwiperSlide
                  className="!flex my-auto"
                  key={index}
                  onClick={() => handleSlideClick(index)}
                >
                  {({ isActive }) => (
                    <span
                      className={`duration-300 font-medium cursor-pointer mx-auto ${
                        isActive
                          ? "text-[#1C1F25] text-xl tablet:text-2xl"
                          : "text-N800/80 text-sm tablet:text-lg"
                      }`}
                    >
                      {item.year}
                    </span>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
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
      </div>
    </SectionBlock>
  );
};

export default TimeMachineBlock;
