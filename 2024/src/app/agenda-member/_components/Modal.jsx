import { BasicModal, ModalBody, CloseButton } from "@/components/ui/BasicModal";
import ModalImage from "@/components/ModalImage";
import SocialLinks from "./SocialLinks";
import { GreenLeaf, OrangeLeaf } from "@/components/ui/ModalLeaf";
const Modal = ({ onClose, ...props }) => {
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
              <SocialLinks
                speaker={props}
                className="size-5"
                iconClass="text-xs"
              />
            </div>
          </div>
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-N800/80 font-medium leading-6">介紹</h3>
              <OrangeLeaf />
            </div>
            <p className="text-N800/80 leading-6">{props.bio}</p>
          </section>
        </div>
      </ModalBody>
    </BasicModal>
  );
};

export default Modal;
