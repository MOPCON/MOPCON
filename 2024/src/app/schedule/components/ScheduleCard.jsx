"use client";
import React from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { motion } from "framer-motion";
import clsx from "clsx";
import { opacityAnimation } from "@/components/util/animation";

const ScheduleCard = ({ isKeynote, ...props }) => {
  return (
    <motion.div
      className={clsx(
        "rounded-3xl p-0.5 bg-gradient-to-r from-[#E8EFFA] to-[#AEBECF] hover:from-[#E4F2F0] hover:to-[#96CAC3] shadow-[0_10px_30px_0_rgba(0,0,0,0.05)] cursor-pointer",
        {
          "col-span-2": isKeynote,
          "laptop:col-start-1 laptop:row-start-1":
            !isKeynote && props.room === 1,
          "laptop:col-start-2 laptop:row-start-1":
            !isKeynote && props.room === 2,
        }
      )}
      layout
      onClick={() => props.onClick()}
      variants={opacityAnimation(0.3)}
      initial="initial"
      exit="initial"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="size-full rounded-[calc(24px-2px)] bg-white px-8 py-6 flex flex-col">
        <div className="flex items-center flex-wrap gap-3 mb-4">
          {props.tags?.map((tag) => (
            <span
              key={tag.id}
              className="text-secondary border-2 border-secondary px-3 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
        <h5 className="laptop:text-lg font-medium text-N800 mb-10">
          {props.topic}
        </h5>
        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full overflow-clip flex items-center justify-center flex-shrink-0">
              <Image
                src={getImageSrc(props.img || "/img/swiper-default.webp")}
                width={40}
                height={40}
                alt={props.name}
                className="object-cover size-full max-w-full"
              />
            </div>
            <h6 className="text-sm tablet:text-base">{props.name}</h6>
            {props.coSpeaker &&
              props.coSpeaker.map((speaker) => (
                <>
                  <div className="size-10 rounded-full overflow-clip flex items-center justify-center flex-shrink-0">
                    <Image
                      src={getImageSrc(
                        speaker.img || "/img/swiper-default.webp"
                      )}
                      width={40}
                      height={40}
                      alt={speaker.name}
                      className="object-cover size-full max-w-full"
                    />
                  </div>
                  <h6 className="text-sm tablet:text-base">{speaker.name}</h6>
                </>
              ))}
          </div>
          <div className="flex items-center text-N800 gap-1">
            <svg
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.2078 10.2459C5.9503 10.2459 4.92699 9.22344 4.92699 7.96594C4.92699 6.70844 5.9503 5.6851 7.2078 5.6851C8.4653 5.6851 9.4878 6.70844 9.4878 7.96594C9.4878 9.22344 8.4653 10.2459 7.2078 10.2459ZM11.8861 2.87677C10.6103 1.56094 8.94864 0.835938 7.2078 0.835938C5.4653 0.835938 3.80365 1.56094 2.52699 2.8776C1.23115 4.21427 0.519487 6.0101 0.575321 7.8051C0.732821 12.8918 6.72447 16.8526 6.9803 17.0184L7.20447 17.1643L7.43114 17.0209C7.68614 16.8593 13.682 12.9943 13.8403 7.80427C13.8953 6.0101 13.1828 4.21344 11.8861 2.87677Z"
                fill="#4B5162"
              />
            </svg>
            <span className="text-sm tablet:text-base">R{props.room}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduleCard;
