import React, { Fragment } from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";

const HeroSection = ({ children }) => {
  return (
    <Fragment>
      <section className="w-screen pt-6 pb-16 relative h-auto">
        <Image
          height={90}
          width={562}
          src={getImageSrc("/hero-bg.png")}
          aria-hidden="true"
          className="absolute w-full h-[calc(100%+80px)] object-cover bottom-0 left-0 right-0 pointer-events-none z-50"
        />
        {children}
      </section>
    </Fragment>
  );
};

export default HeroSection;
