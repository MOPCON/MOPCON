import React from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import Link from "next/link";
import { FaArrowRight, FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import { Instagram } from "./icons";
import HeroSection from "@/components/ui/HeroSection";
const NewHero = () => {
  return (
    <HeroSection>
      <div className="w-[min(90%,1280px)] mx-auto tablet:ps-10">
        <div className="hidden tablet:flex items-center gap-4 justify-end font-bold text-sm text-[#AEBECF] mb-8">
          <span>$&#123;con&#125; with Inspiration</span>
          <div className="w-[2px] h-4 bg-[#AEBECF80]/50" />
          <span>2024</span>
          <div className="w-[2px] h-4 bg-[#AEBECF80]/50" />
          <span>mopcon.org</span>
        </div>
        <Image
          height={90}
          width={562}
          src={getImageSrc("/Logo.svg")}
          alt="mopcon logo"
          className="max-w-full mb-10"
        />
        <div className="mb-10 font-medium">
          <p className="mb-2 text-[#6F7481] tablet:text-xl">
            2024.10.26 (Sat.) - 2024.10.27 (Sun.)
          </p>
          <h2 className="mb-6 text-lg tablet:text-2xl text-light-green">
            高雄展覽館 Kaohsiung Exhibition Center
          </h2>
          <h3 className="text-secondary text-lg tablet:text-2xl">
            Generative AI
            <span className="text-[#161C2D] inline-block mx-2">x</span>
            行動聯網<span className="text-[#161C2D] inline-block mx-2">x</span>
            邊緣運算
          </h3>
        </div>
        <div className="flex items-center gap-y-3 gap-4 tablet:gap-x-6 flex-wrap">
          <Link
            className="w-40 tablet:w-48 flex items-center justify-center gap-3 rounded-xl bg-orange text-white font-bold h-12 px-8 hover:shadow-[0_0_20px_2px_rgba(247,_144,_34,_0.6),0_0_25px_3px_rgba(255,_255,_255,_0.25),inset_0_0_20px_0_rgba(255,_255,_255,_0.6)] transition-all duration-150"
            href="/tickets"
          >
            前往購票
            <FaArrowRight />
          </Link>
          <Link
            className="w-40 tablet:w-48 bg-[#FEF3E2] text-orange font-bold rounded-xl h-12 px-8 flex items-center justify-center hover:shadow-[0_0_20px_2px_rgba(247,_144,_34,_0.6),0_0_25px_3px_rgba(255,_255,_255,_0.25),inset_0_0_20px_0_rgba(255,_255,_255,_0.6)] transition-all duration-150"
            href="/tickets"
          >
            大會議程
          </Link>
        </div>
        <div className="mt-36 flex flex-col gap-4 w-fit ms-auto">
          <div className="flex items-center gap-3 font-medium text-[#161C2D]">
            <div className="h-[2px] w-8 bg-[#AEBECF]" />
            在這裡找到 #MOPCON
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="rounded-xl flex items-center justify-center size-14 bg-[rgba(24,_119,_242,_0.08)]"
              href="https://www.facebook.com/mopcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-[#1877F2] text-2xl" />
            </Link>
            <Link
              className="rounded-xl flex items-center justify-center size-14 bg-[rgba(0,_0,_0,_0.08)]"
              href="https://x.com/mopcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="text-2xl" />
            </Link>
            <Link
              className="rounded-xl flex items-center justify-center size-14 bg-[rgba(36,_161,_222,_0.08)]"
              href="https://t.me/mopcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane className="text-[#24A1DE] text-2xl" />
            </Link>
            <Link
              className="rounded-xl flex items-center justify-center size-14 bg-[linear-gradient(50deg,_rgba(255,_214,_0,_0.08),_rgba(255,_1,_0,_0.08),_rgba(216,_0,_185,_0.08))]"
              href="https://www.instagram.com/mopcon.tw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </Link>
          </div>
        </div>
      </div>
    </HeroSection>
  );
};

export default NewHero;
