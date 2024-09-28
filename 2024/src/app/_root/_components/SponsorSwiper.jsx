"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { getImageSrc } from "@/components/util/getImageSrc";
import Data from "@/components/data/data.json";

const SwiperCard = ({ img, name }) => {
  return (
    <div className="flex items-center justify-center gap-4 w-36 h-20 m-auto overflow-clip bg-inherit">
      <Image
        src={getImageSrc(img || "/img/swiper-default.webp")}
        width={120}
        height={60}
        alt={name || "2024Sponsor"}
        className="object-contain w-full h-full"
      />
    </div>
  );
};
const SponsorSwiper = () => {
  const allCompanies = Data.sponsors.reduce((acc, sponsor) => {
    return acc.concat(sponsor.companies);
  }, []);
  return (
    <div className="py-8 bg-[#F4F7FA]">
      <Swiper
        spaceBetween={48}
        slidesPerView="auto"
        loopAdditionalSlides={10}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        speed="10000"
        style={{
          "--swiper-wrapper-transition-timing-function": "linear",
        }}
      >
        {allCompanies.map((item, index) => (
          <SwiperSlide key={index} className="max-w-40 flex">
            <SwiperCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SponsorSwiper;
