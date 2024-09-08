import { BasicModal, ModalBody, CloseButton } from "@/components/ui/BasicModal";
import { FaFacebook } from "react-icons/fa";
import { GoGlobe } from "react-icons/go";
import ModalImage from "@/components/ModalImage";
import { GrLocation } from "react-icons/gr";
import { FiCalendar } from "react-icons/fi";
import { GreenLeaf, OrangeLeaf } from "@/components/ui/ModalLeaf";
import { FiShare2 } from "react-icons/fi";
import { LuCalendarCheck } from "react-icons/lu";
import { useJsonParse } from "@/components/hook/useJsonParse";
const SpeakerModal = ({ onClose, ...props }) => {
  const summary = useJsonParse(props.summary);
  const bio = useJsonParse(props.bio);
  return (
    <BasicModal
      onClose={onClose}
      className="w-[min(95%,800px)] rounded-3xl mob:rounded-[54px] h-auto"
    >
      <ModalBody
        className={
          "rounded-[calc(24px-3px)] mob:rounded-[calc(54px-3px)] pt-10 px-8 mob:px-14 tablet:px-20 pb-[60px]"
        }
      >
        <CloseButton onClose={onClose} iconClass={"text-xl text-secondary"} />
        <div className="max-h-[calc(100dvh-200px)] overflow-y-auto">
          <div className="flex flex-col items-center mob:block mb-10">
            <div className="flex gap-3 flex-col mob:flex-row items-center w-fit mb-3">
              <div className="size-[120px] rounded-[50%] overflow-clip flex items-center justify-center">
                <ModalImage src={props.img} alt={props.name} />
              </div>
              <div>
                <h4 className="font-bold text-[#343844] mb-2">{props.name}</h4>
                <div className="flex flex-col items-center mob:items-start">
                  <span className="text-N800 font-medium">{props.company}</span>
                  <span className="text-N800 font-medium">
                    {props.jobTitle}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-evenly w-[120px]">
              <a
                href="#"
                rel="noreferrer noopener"
                target="_blank"
                className="text-secondary"
              >
                <GoGlobe className="text-xl" aria-label="Visit website" />
              </a>
              <a
                href="#"
                rel="noreferrer noopener"
                target="_blank"
                className="text-secondary"
              >
                <FaFacebook
                  className="text-xl"
                  aria-label="Visit Facebook page"
                />
              </a>
            </div>
          </div>
          <article className="flex flex-col gap-10 mb-10">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-N800/80 font-medium leading-6">介紹</h3>
                <OrangeLeaf />
              </div>
              <div className="text-N800/80 leading-6 flex flex-col gap-2">
                {bio}
              </div>
            </section>
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-N800/80 font-medium leading-6">議程主題</h3>
                <GreenLeaf />
              </div>
              <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 mb-4">
                <h3 className="font-bold text-N800 text-lg row-start-3 tablet:row-start-1">
                  {props.topic}
                </h3>
                <div className="flex items-center tablet:justify-end gap-6">
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
              <div className="text-N800/80 leading-6 mb-4 flex flex-col gap-2">
                {summary}
              </div>
              <div className="flex items-center justify-center mob:justify-normal gap-3 flex-wrap">
                {props.tags.map((item) => (
                  <span
                    key={item.id}
                    className="rounded-full px-3 py-1 text-white bg-secondary"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </section>
            {props.target && (
              <section>
                <h3 className="text-N800/80 font-medium leading-6 mb-4">
                  目標會眾
                </h3>
                <p className="text-N800/80 leading-6">
                  {useJsonParse(props.target)}
                </p>
              </section>
            )}
            {props.priorKnowledge && (
              <section>
                <h3 className="text-N800/80 font-medium leading-6 mb-4">
                  先備知識
                </h3>
                <p className="text-N800/80 leading-6">
                  {useJsonParse(props.priorKnowledge)}
                </p>
              </section>
            )}
            {props.expectedGain && (
              <section>
                <h3 className="text-N800/80 font-medium leading-6 mb-4">
                  會眾預期收穫
                </h3>
                <p className="text-N800/80 leading-6">
                  {useJsonParse(props.expectedGain)}
                </p>
              </section>
            )}
          </article>
          <div className="grid grid-cols-1 mob:grid-cols-2 gap-3">
            <button className="btn btn-primary flex items-center gap-2 justify-center">
              <FiShare2 />
              分享議程
            </button>
            <button className="btn btn-secondary flex items-center gap-2 justify-center">
              <LuCalendarCheck />
              加入行事曆
            </button>
          </div>
        </div>
      </ModalBody>
    </BasicModal>
  );
};

export default SpeakerModal;
