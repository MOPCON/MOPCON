"use client";
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCreative,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const SwiperCard = ({ img }) => {
  return (
    <div className="overflow-clip bg-secondary rounded-[40px] w-[min(100%,800px)] h-[400px] flex items-center justify-center">
      <Image
        src="/assets/img/swiper-default.webp"
        width={120}
        height={120}
        alt="sponsor"
        className="object-contain"
      />
    </div>
  );
};

const SponsorSwiper = () => {
  return (
    <Fragment>
      <Swiper
        slidesPerView={1}
        loopAdditionalSlides={2}
        centeredSlides={true}
        effect={"creative"}
        speed={400}
        loop={true}
        navigation={{
          nextEl: `.sponsor-next`,
          prevEl: `.sponsor-prev`,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".sponsor-pagination",
          clickable: true,
          bulletActiveClass: "w-3 h-3 bg-orange",
          renderBullet: function (index, className) {
            return (
              '<span class="w-2 h-2 bg-cream flex-shrink-0 cursor-pointer rounded-[50%] transition-all duration-300 ' +
              className +
              '">' +
              "</span>"
            );
          },
        }}
        modules={[Navigation, EffectCreative, Pagination, Autoplay]}
        // breakpoints={{
        //   768: {
        //     slidesPerView: "2",
        //   },
        // }}
        width={800}
        creativeEffect={{
          limitProgress: 2,
          prev: {
            translate: [180, 0, -180],
            scale: 0.9,
          },
          next: {
            translate: [-180, 0, -180],
            scale: 0.9,
          },
          shadowPerProgress: 3,
        }}
      >
        {Array(8)
          .fill()
          .map((item, index) => (
            <SwiperSlide key={index}>
              <SwiperCard img="/assets/img/swiper-default.webp" />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="flex items-center gap-2 justify-center mt-6">
        <button
          type="button"
          className="swiper-button-prev sponsor-prev text-2xl text-[#364758] p-4"
          aria-label="Previous Slide"
        >
          <IoArrowBack />
        </button>
        <div className="swiper-pagination sponsor-pagination flex items-center gap-2"></div>
        <button
          type="button"
          className="swiper-button-next sponsor-next text-2xl text-[#364758] p-4"
          aria-label="Next Slide"
        >
          <IoArrowForward />
        </button>
      </div>
    </Fragment>
  );
};

export default SponsorSwiper;
