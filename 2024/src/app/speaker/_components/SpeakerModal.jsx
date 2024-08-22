import BasicModal from "@/components/ui/BasicModal";

const SpeakerModal = ({ onClose, ...props }) => {
  return (
    <BasicModal onClose={onClose}>
      <div className="w-[min(95%,800px)] rounded-3xl mob:rounded-[54px] h-auto"></div>
    </BasicModal>
  );
};

export default SpeakerModal;
