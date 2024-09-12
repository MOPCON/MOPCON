import React, { Fragment } from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { twMerge } from "tailwind-merge";

const HeroTitle = ({ children, className }) => {
  return (
    <h1 className={twMerge("block-title mb-10", className)}>{children}</h1>
  );
};
const HeroContent = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "w-[min(100%,860px)] mx-auto text-N800/80 text-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

const HeroSection = ({ children, ...props }) => {
  return (
    <Fragment>
      <section className="w-screen pt-6 pb-16 relative h-auto">
        <Image
          height={90}
          width={562}
          src={getImageSrc("/hero-bg.png")}
          aria-hidden="true"
          className="absolute w-full h-[calc(100%+80px)] object-cover bottom-0 left-0 right-0 pointer-events-none z-50"
          alt="hero background"
        />
        <div
          className={twMerge(
            "w-[min(90%,1280px)] mx-auto mb-8 tablet:mb-16",
            props.className
          )}
        >
          <div
            className={twMerge(
              "hidden tablet:flex items-center gap-4 justify-end font-bold text-sm text-[#AEBECF] mb-28",
              props.titleClassName
            )}
          >
            <span>$&#123;con&#125; with Inspiration</span>
            <div className="w-[2px] h-4 bg-[#AEBECF80]/50" />
            <span>2024</span>
            <div className="w-[2px] h-4 bg-[#AEBECF80]/50" />
            <span>mopcon.org</span>
          </div>
          {children}
        </div>
      </section>
    </Fragment>
  );
};

export { HeroSection, HeroTitle, HeroContent };
