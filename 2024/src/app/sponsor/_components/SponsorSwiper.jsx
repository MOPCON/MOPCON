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
import { getImageSrc } from "@/components/util/getImageSrc";

const sponsorImg = [
  "2023sponsor-1.webp",
  "2023sponsor-2.webp",
  "2023sponsor-3.webp",
  "2023sponsor-4.webp",
  "2023sponsor-5.webp",
  "2023sponsor-6.webp",
  "2023sponsor-7.webp",
  "2023sponsor-8.webp",
  "2023sponsor-9.webp",
];
const SwiperCard = ({ img, blur }) => {
  return (
    <div className="overflow-clip bg-secondary rounded-2xl tablet:rounded-[40px] w-[min(100%,800px)] h-[230px] tablet:h-[400px] flex items-center justify-center">
      <Image
        src={getImageSrc(img || "/img/swiper-default.webp")}
        width={300}
        height={300}
        alt="2023Sponsor"
        blurDataURL={getImageSrc(blur)}
        className="object-cover w-full h-full"
        placeholder="blur"
        quality={75}
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
        speed={440}
        loop={true}
        navigation={{
          nextEl: `.sponsor-next`,
          prevEl: `.sponsor-prev`,
        }}
        breakpointsBase="container"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".sponsor-pagination",
          clickable: true,
          bulletActiveClass: "size-3 bg-orange",
          renderBullet: function (index, className) {
            return (
              '<span class="size-2 bg-cream flex-shrink-0 cursor-pointer rounded-[50%] transition-all duration-300 ' +
              className +
              '">' +
              "</span>"
            );
          },
        }}
        modules={[Navigation, EffectCreative, Pagination, Autoplay]}
        breakpoints={{
          730: {
            slidesPerView: "2.5",
          },
        }}
        creativeEffect={{
          limitProgress: 2,
          prev: {
            translate: [-180, 0, -180],
            scale: 0.9,
          },
          next: {
            translate: [180, 0, -180],
            scale: 0.9,
          },
        }}
      >
        {sponsorImg.map((item, index) => (
          <SwiperSlide key={index}>
            <SwiperCard
              img={`/sponsor/2023/${item}`}
              blur={`/sponsor/2023/blur/${item}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center gap-2 justify-center mt-6">
        <button
          type="button"
          className="swiper-button-prev sponsor-prev text-2xl text-[#364758] p-4 hidden tablet:inline-block"
          aria-label="Previous Slide"
        >
          <IoArrowBack />
        </button>
        <div className="swiper-pagination sponsor-pagination flex items-center gap-2"></div>
        <button
          type="button"
          className="swiper-button-next sponsor-next text-2xl text-[#364758] p-4 hidden tablet:inline-block"
          aria-label="Next Slide"
        >
          <IoArrowForward />
        </button>
      </div>
    </Fragment>
  );
};

export default SponsorSwiper;
