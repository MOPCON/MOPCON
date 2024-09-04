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
      </div>
    </section>
  );
};

export default PeripheralGoods;
