import React from "react";
import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
import { getImageSrc } from "@/components/util/getImageSrc";
import Image from "next/image";
const PeripheralGoods = () => {
  return (
    <section className="w-full py-12 tablet:py-24 relative bg-[#F4F7FA]">
      <Image
        src={getImageSrc("/community/bg-wave.svg")}
        alt="behavioral-guidelines-bg"
        width={1920}
        height={1080}
        className="absolute w-full h-full object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      />
      <div className="w-[min(90%,1062px)] mx-auto">
        <BlockTitleArrow>紀念商品</BlockTitleArrow>
        <h4 className="block-title mb-10">
          <span className="text-light-green">周邊商品</span> 搶先看
        </h4>
        <div className="rounded-[40px] h-[480px] p-0.5">
          <div className="size-full rounded-[calc(40px-2px)] bg-[linear-gradient(130deg,_rgba(255,255,255,0.5),_rgba(144,164,185,0.5))] flex flex-col items-center justify-center text-[40px] font-bold text-N800 gap-5">
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 30V21C21 17.0218 22.5804 13.2064 25.3934 10.3934C28.2064 7.58035 32.0218 6 36 6C39.9782 6 43.7936 7.58035 46.6066 10.3934C49.4196 13.2064 51 17.0218 51 21V30M39 48C39 49.6568 37.6569 51 36 51C34.3431 51 33 49.6568 33 48C33 46.3431 34.3431 45 36 45C37.6569 45 39 46.3431 39 48ZM15 30H57C60.3137 30 63 32.6863 63 36V60C63 63.3137 60.3137 66 57 66H15C11.6863 66 9 63.3137 9 60V36C9 32.6863 11.6863 30 15 30Z"
                stroke="#4B5162"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            &#123;內容即將解鎖&#125;
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeripheralGoods;
