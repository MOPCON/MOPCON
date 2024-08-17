import { Leaf } from "./icons";
import { getImageSrc } from "@/components/util/getImageSrc";
import Image from "next/image";
const RecruitPartner = () => {
  return (
    <section className="w-full h-[468px] relative overflow-clip flex">
      <Image
        width={500}
        height={500}
        src={getImageSrc("/sponsor/join-us-bg.webp")}
        alt="bg-img"
        className="absolute w-11/12 h-full object-cover bottom-0 left-0 translate-y-[15%] pointer-events-none opacity-50 [mask-image:radial-gradient(circle,_#fff_0%,_transparent_100%)]"
      />
      <div className="flex flex-col items-center w-[min(90%,380px)] m-auto relative z-[1]">
        <h4 className="font-bold text-[31px] text-darkest-green mb-5">
          贊助夥伴招募
        </h4>
        <p className="text-N800 leading-6 mb-5">
          如果您有意願支持我們，請寄信到我們的贊助信箱。謝謝你願意成為全台最大行動科技領域社群研討會的參與者及貢獻者之一！
        </p>
        <a
          className="btn btn-primary flex items-center gap-3 group mb-5"
          href="mailto:sponsor@mopcon.org"
        >
          <Leaf className="stroke-white group-hover:stroke-secondary" />
          贊助企劃書
        </a>
        <span className="text-secondary mb-1 text-xl">sponsor@mopcon.org</span>
        <span className="text-N800">MOPCON 2024 贊助組 收</span>
      </div>
    </section>
  );
};

export default RecruitPartner;
