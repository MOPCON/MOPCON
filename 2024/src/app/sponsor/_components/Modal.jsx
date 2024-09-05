import { BasicModal, ModalBody, CloseButton } from "@/components/ui/BasicModal";
import { FaFacebook } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { GoGlobe } from "react-icons/go";
import { FiCalendar } from "react-icons/fi";
import ModalImage from "@/components/ModalImage";
import { GreenLeaf, OrangeLeaf } from "@/components/ui/ModalLeaf";

const Modal = ({ sponsorData, onClose }) => {
  return (
    <BasicModal
      className="w-[min(95%,800px)] rounded-3xl mob:rounded-[54px] h-auto"
      onClose={onClose}
    >
      <ModalBody className="rounded-[calc(24px-3px)] mob:rounded-[calc(54px-3px)] pt-10 px-8 mob:px-14 tablet:px-20 pb-[60px]">
        <CloseButton iconClass={"text-xl text-secondary"} onClose={onClose} />
        <div className="max-h-[600px] overflow-y-auto">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center mob:block">
              <div className="flex gap-3 flex-col mob:flex-row items-center w-fit mb-3">
                <div className="size-20 flex items-center justify-center">
                  <ModalImage
                    src={sponsorData.img}
                    alt={sponsorData.name}
                    className="object-contain"
                  />
                </div>
                <h4 className="font-bold text-[#343844]">{sponsorData.name}</h4>
              </div>
              <div className="flex items-center justify-evenly w-20">
                {sponsorData.web && (
                  <a
                    href={sponsorData.web}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="text-secondary"
                  >
                    <GoGlobe aria-label="Visit website" />
                  </a>
                )}
                {sponsorData.fb && (
                  <a
                    href={sponsorData.fb}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="text-secondary"
                  >
                    <FaFacebook aria-label="Visit Facebook page" />
                  </a>
                )}
              </div>
            </div>
            <article>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-N800/80 font-medium leading-6">關於我們</h3>
                <OrangeLeaf />
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
                  <GreenLeaf />
                </div>
                <div className="flex items-center flex-col mob:flex-row justify-between gap-5 mob:gap-10">
                  <div className="size-20 flex items-center justify-center">
                    <ModalImage src={sponsorData.img} alt={sponsorData.name} />
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
      </ModalBody>
    </BasicModal>
  );
};

export default Modal;
