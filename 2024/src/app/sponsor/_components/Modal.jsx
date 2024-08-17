import BasicModal from "@/components/ui/BasicModal";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { GoGlobe } from "react-icons/go";
import { FiCalendar } from "react-icons/fi";
import { AboutLeaf, SpeakerLeaf } from "../_ui/icons";
import { getImageSrc } from "@/components/util/getImageSrc";

const SponsorImage = ({ src, alt }) => (
  <Image
    src={getImageSrc(src || "/img/swiper-default.webp")}
    alt={alt}
    height={80}
    width={80}
    className="object-contain w-full h-full"
  />
);

const Modal = ({ sponsorData, onClose }) => {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <BasicModal
      className="w-[min(95%,800px)] rounded-3xl mob:rounded-[54px] h-auto"
      onClose={onClose}
    >
      <div
        className="rounded-[calc(24px-3px)] mob:rounded-[calc(54px-3px)] bg-white h-full w-full relative pt-10 px-8 mob:px-20 pb-[60px]"
        onClick={handleContentClick}
      >
        <div className="max-h-[600px] overflow-y-auto">
          <button
            className="absolute -translate-x-6 translate-y-6 top-0 right-0 p-3"
            onClick={onClose}
            type="button"
            aria-label="Modal-Close"
          >
            <IoClose className="text-xl text-secondary" />
          </button>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center mob:block">
              <div className="flex gap-3 flex-col mob:flex-row items-center w-fit mb-3">
                <div className="size-20 flex items-center justify-center">
                  <SponsorImage src={sponsorData.img} alt={sponsorData.name} />
                </div>
                <h4 className="font-bold text-[#343844]">{sponsorData.name}</h4>
              </div>
              <div className="flex items-center justify-evenly w-20">
                <a
                  href="#"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="text-secondary"
                >
                  <GoGlobe aria-label="Visit website" />
                </a>
                <a
                  href="#"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="text-secondary"
                >
                  <FaFacebook aria-label="Visit Facebook page" />
                </a>
              </div>
            </div>
            <article>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-N800/80 font-medium leading-6">關於我們</h3>
                <AboutLeaf />
              </div>
              <p className="text-N800/80 leading-6">
                {sponsorData.description}
              </p>
            </article>
            {sponsorData.speaker && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="text-N800/80 font-medium leading-6">
                    相關講者資訊
                  </h3>
                  <SpeakerLeaf />
                </div>
                <div className="flex items-center flex-col mob:flex-row justify-between gap-5 mob:gap-10">
                  <div className="size-20 flex items-center justify-center">
                    <SponsorImage
                      src={sponsorData.img}
                      alt={sponsorData.name}
                    />
                  </div>
                  <div className="flex flex-col justify-evenly flex-auto gap-2">
                    <h4 className="font-bold text-N800/80 leading-6">姓名</h4>
                    <h5 className="text-N800/80 leading-6">職稱</h5>
                  </div>
                  <div className="flex flex-col justify-evenly flex-auto gap-2">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-secondary" />
                      <time className="text-N800/80" dateTime="2024-10-26">
                        日期，時間
                      </time>
                    </div>
                    <div className="flex items-center gap-2">
                      <GrLocation className="text-secondary" />
                      <span className="text-N800/80">棟（樓）</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BasicModal>
  );
};

export default Modal;
