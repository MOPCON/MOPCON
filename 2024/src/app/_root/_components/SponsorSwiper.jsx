"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { getImageSrc } from "@/components/util/getImageSrc";
import Data from "@/components/data/data.json";

const SwiperCard = ({ img, name }) => {
  return (
    <div className="flex items-center justify-center gap-4 w-48 h-20 m-auto overflow-clip bg-inherit">
      {img ? (
        <Image
          src={getImageSrc(img || "/img/swiper-default.webp")}
          width={120}
          height={60}
          alt={name || "2024Sponsor"}
          className="object-contain w-full h-full pointer-events-none"
        />
      ) : (
        <span className="text-secondary tracking-wider text-2xl font-bold">
          {name}
        </span>
      )}
    </div>
  );
};
const SponsorSwiper = () => {
  const allCompanies = Data.sponsors.reduce((acc, sponsor) => {
    return acc.concat(sponsor.companies);
  }, []);

  const duplicatedCompanies = [...allCompanies, ...allCompanies];

  return (
    <div className="py-12 bg-[#F4F7FA]">
      <Swiper
        spaceBetween={96}
        slidesPerView="auto"
        loopAdditionalSlides={3}
        loop={true}
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        speed="10000"
        style={{
          "--swiper-wrapper-transition-timing-function": "linear",
        }}
      >
        {duplicatedCompanies.map((item, index) => (
          <SwiperSlide key={index} className="max-w-48 flex">
            <SwiperCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SponsorSwiper;
