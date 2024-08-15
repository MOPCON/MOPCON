"use client";
import React, { useState } from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import { motion, AnimatePresence } from "framer-motion";

const animate = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Venue = () => {
  const [activeImage, setActiveImage] = useState("info");

  function showVenueInfoImage() {
    setActiveImage("info");
  }

  function showVenueMapImage() {
    setActiveImage("map");
  }

  return (
    <section className="w-[min(90%,1204px)] mx-auto flex flex-col items-center justify-center gap-8 laptop:gap-[4rem] py-24">
      <div className="flex flex-col gap-4 w-full">
        <h4 className="block-title text-center">會場</h4>
        <p className="paragraph text-center leading-7">
          高雄展覽館 Kaohsiung Exhibition Center
          <br />
          高雄市前鎮區成功二路39號
        </p>
        <div className="flex flex-col mob:flex-row w-full mx-auto mob:w-fit items-center gap-3 mt-4">
          <button
            className={`btn ${
              activeImage === "info" ? "btn-primary" : "btn-secondary"
            } w-full`}
            onClick={showVenueInfoImage}
          >
            場地資訊
          </button>
          <button
            className={`btn ${
              activeImage === "map" ? "btn-primary" : "btn-secondary"
            } w-full`}
            onClick={showVenueMapImage}
          >
            場館地圖
          </button>
        </div>
      </div>
      <AnimatePresence>
        <div className="w-full rounded-3xl overflow-hidden border-2 border-secondary">
          {activeImage === "info" && (
            <motion.div
              key="info"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animate}
              transition={{ duration: 0.5 }}
            >
              <Image
                className="object-cover w-full h-full max-w-full"
                src={getImageSrc("/img/Exhibition-Center.webp")}
                width={1204}
                height={629}
                alt="高雄展覽館場地資訊"
              />
            </motion.div>
          )}
          {activeImage === "map" && (
            <motion.div
              key="map"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animate}
              transition={{ duration: 0.5 }}
            >
              <Image
                className="object-cover w-full h-full max-w-full"
                src={getImageSrc("/img/Exhibition-Center-2.webp")}
                width={1204}
                height={629}
                alt="高雄展覽館地圖"
              />
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </section>
  );
};

export default Venue;
