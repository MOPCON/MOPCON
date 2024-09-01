import { getImageSrc } from "@/components/util/getImageSrc";
import Image from "next/image";
const RecruitPartner = () => {
  return (
    <section className="w-full h-[610px] relative overflow-clip flex bg-[#F4F7FA]">
      <Image
        width={500}
        height={500}
        src={getImageSrc("/sponsor/bg-Square.svg")}
        alt="bg-img"
        className="absolute w-full h-full max-w-7xl object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
      <div className="w-[min(90%,628px)] m-auto relative z-[1]">
        <div className="flex items-center gap-3 text-[#AEBECF] mb-5">
          招募訊息
          <svg
            width="62"
            height="18"
            viewBox="0 0 62 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 9H60M60 9L55.4813 5M60 9L55.4813 13"
              stroke="#AEBECF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h4 className="block-title mb-10 text-center">
          贊助夥伴 <span className="text-light-green">招募</span>
        </h4>
        <p className="text-N800 leading-6 mb-20">
          如果您有意願支持我們，請寄信到我們的贊助信箱。謝謝你願意成為全台最大行動科技領域社群研討會的參與者及貢獻者之一！
        </p>
        <a
          className="flex mx-auto w-48 items-center justify-center gap-3 mb-6 rounded-xl bg-orange text-white font-bold h-12 px-8 hover:shadow-[0_0_20px_2px_rgba(247,_144,_34,_0.6),0_0_25px_3px_rgba(255,_255,_255,_0.25),inset_0_0_20px_0_rgba(255,_255,_255,_0.6)] transition-all duration-150"
          href="mailto:sponsor@mopcon.org"
        >
          我要贊助
        </a>
        <div className="text-secondary mb-1 text-xl font-medium text-center">
          sponsor@mopcon.org
        </div>
        <div className="text-N800 text-center">MOPCON 2024 贊助組 收</div>
      </div>
    </section>
  );
};

export default RecruitPartner;
