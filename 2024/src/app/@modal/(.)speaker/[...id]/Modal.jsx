"use client";
import { useRouter } from "next/navigation";
import BasicModal from "@/components/ui/BasicModal";

const Modal = () => {
  const router = useRouter();

  function onDismiss() {
    router.back();
  }

  return (
    <BasicModal
      className="w-[min(95%,800px)] rounded-3xl mob:rounded-[54px] h-auto"
      onClose={onDismiss}
    >
      <h1>Speaker</h1>
    </BasicModal>
  );
};

export default Modal;
