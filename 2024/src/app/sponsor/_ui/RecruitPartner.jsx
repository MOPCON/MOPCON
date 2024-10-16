import { getImageSrc } from "@/components/util/getImageSrc";
import Image from "next/image";
import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
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
        <BlockTitleArrow>招募訊息</BlockTitleArrow>
        <h4 className="block-title mb-10 text-center">
          贊助夥伴 <span className="text-light-green">招募</span>
        </h4>
        <p className="text-N800 leading-6 mb-20">
          如果您有意願支持我們，請寄信到我們的贊助信箱。謝謝你願意成為全台最大行動科技領域社群研討會的參與者及貢獻者之一！
        </p>
        <a
          className="mx-auto w-48 btn btn-primary"
          href="mailto:sponsor@mopcon.org"
        >
          我要贊助
        </a>
        <div className="text-secondary mb-1 text-lg tablet:text-xl font-medium text-center">
          sponsor@mopcon.org
        </div>
        <div className="text-N800 text-sm tablet:text-base text-center">
          MOPCON 2024 贊助組 收
        </div>
      </div>
    </section>
  );
};

export default RecruitPartner;
