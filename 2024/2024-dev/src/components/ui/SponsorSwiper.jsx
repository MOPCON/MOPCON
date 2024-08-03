"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";

const SwiperCard = ({ img, title }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[240px] h-[154px] rounded-[20px] border border-[#B6BCCD]">
      {img ? (
        <div className="w-[100px] h-1/2 flex items-center justify-center">
          <Image
            className="h-full object-contain"
            src={img}
            width={100}
            height={100}
            alt={title}
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-[50%] border border-white/60">
          <Image
            className="h-full object-contain"
            src="/assets/img/swiper-default.webp"
            width={32}
            height={32}
            alt={title}
          />
        </div>
      )}
      <span className="text-center font-bold text-[#343844]">{title}</span>
    </div>
  );
};
const SponsorSwiper = () => {
  return (
    <Swiper
      spaceBetween={24}
      slidesPerView="auto"
      loop={true}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      modules={[Autoplay]}
      speed="8000"
      style={{
        "--swiper-wrapper-transition-timing-function": "linear",
      }}
    >
      {Array(18)
        .fill()
        .map((item, index) => (
          <SwiperSlide key={index} className="max-w-[240px]">
            <SwiperCard title={`贊助商名稱-${index + 1}`} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SponsorSwiper;
