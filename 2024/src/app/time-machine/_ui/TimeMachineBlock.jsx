"use client";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import TimeMachineCard from "../_components/TimeMachineCard";
import { ArrowRight, ArrowLeft } from "./SwiperArrow";
import Data from "@/components/data/timeMachine.json";
import { useState, Fragment } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { SwiperSlide } from "swiper/react";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

const TimeMachineBlock = () => {
  const [timeContent, setTimeContent] = useState(null);
  const swiperChangeHandler = (swiper) => {
    setTimeContent(Data[swiper.realIndex]);
  };

  return (
    <Fragment>
      <div className="flex flex-col-reverse tablet:flex-col">
        <AnimatePresence mode="wait">
          {timeContent && (
            <TimeMachineCard key={timeContent.year} data={timeContent} />
          )}
        </AnimatePresence>
        <div className="relative tablet:w-1/2 tablet:mx-auto p-2 mb-8 [mask-image:linear-gradient(90deg,_transparent_0%,_#fff_30%,_#fff_70%,_transparent_100%)] tablet:[mask-image:none]">
          <Swiper
            slidesPerView={5}
            centeredSlides={true}
            speed={440}
            loop={true}
            navigation={{
              nextEl: `.time-next`,
              prevEl: `.time-prev`,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper) => {
              swiperChangeHandler(swiper);
            }}
            breakpointsBase="container"
            spaceBetween={24}
            modules={[Navigation, Autoplay]}
          >
            {Data.map((item, index) => (
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
    </Fragment>
  );
};

export default TimeMachineBlock;
