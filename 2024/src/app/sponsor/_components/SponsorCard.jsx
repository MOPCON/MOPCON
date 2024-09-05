"use client";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { Fragment } from "react";
const SponsorLeaf = ({ className, fill, isGradient, mode }) => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {!isGradient && (
        <path
          d="M0 64H32C49.6731 64 64 49.6731 64 32V0H32C14.3269 0 0 14.3269 0 32V64Z"
          fill={fill}
        />
      )}
      {mode === "light" && isGradient && (
        <>
          <path
            d="M0 64H32C49.6731 64 64 49.6731 64 32V0H32C14.3269 0 0 14.3269 0 32V64Z"
            fill="url(#paint0_linear_2499_1707)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2499_1707"
              x1="64"
              y1="-9.53674e-07"
              x2="-8.3869"
              y2="11.5819"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.1" stopColor="#FFFCE7" />
              <stop offset="0.5" stopColor="#F3F7E8" />
              <stop offset="0.9" stopColor="#E4F2F0" />
            </linearGradient>
          </defs>
        </>
      )}
      {mode === "normal" && isGradient && (
        <>
          <path
            d="M0 64H32C49.6731 64 64 49.6731 64 32V0H32C14.3269 0 0 14.3269 0 32V64Z"
            fill="url(#paint0_linear_2499_1705)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2499_1705"
              x1="0"
              y1="64"
              x2="64"
              y2="-3.8147e-06"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.1" stopColor="#4C766D" />
              <stop offset="0.5" stopColor="#9DBC43" />
              <stop offset="0.905" stopColor="#FCEB75" />
            </linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
};

const SponsorCard = ({ onClick, ...sponsorData }) => {
  return (
    <Fragment>
      <div
        className="group rounded-3xl bg-white cursor-pointer h-56 flex flex-col items-center justify-center relative transition-all duration-300 tablet:hover:-translate-y-3 tablet:hover:shadow-[0_10px_30px_0_rgba(0,0,0,0.05)]"
        onClick={() => {
          onClick(sponsorData.id);
        }}
      >
        <div className="flex flex-col rounded-3xl gap-4 bg-white items-center justify-center size-full p-4 overflow-clip relative z-[2]">
          <div className="h-36 w-48 overflow-clip flex items-center justify-center flex-grow">
            <Image
              className="h-full max-w-full object-contain object-center"
              src={getImageSrc(sponsorData.img || "/img/swiper-default.webp")}
              width={180}
              height={40}
              alt={sponsorData.name}
            />
          </div>
          <span className="text-center font-medium text-xl text-[#1C1F25]">
            {sponsorData.name}
          </span>
          <SponsorLeaf
            className="absolute bottom-0 right-0 translate-y-4 transition-opacity duration-200 opacity-0 tablet:group-hover:opacity-100"
            fill={sponsorData.fillBgLight}
            isGradient={sponsorData.isGradient}
            mode="light"
          />
        </div>
        <SponsorLeaf
          className="absolute bottom-0 right-0 translate-y-2 translate-x-2 transition-opacity duration-200 opacity-0 tablet:group-hover:opacity-100 -z-10"
          fill={sponsorData.fillBg}
          isGradient={sponsorData.isGradient}
          mode="normal"
        />
      </div>
    </Fragment>
  );
};

export default SponsorCard;
