"use client";
import ScheduleCard from "./ScheduleCard";
import { convertTimestampIntl } from "@/components/util/convertTimestampIntl";
import { useModal } from "@/components/hooks/useModal";
import { AnimatePresence } from "framer-motion";
import SpeakerModal from "@/app/speaker/_components/SpeakerModal";

const Schedule = ({ ...props }) => {
  const speakerModal = useModal();

  function handlerCardClick(speaker) {
    speakerModal.openModal(speaker);
  }
  function handlerModalClose() {
    speakerModal.closeModal();
  }

  return (
    <div className="max-w-[1200px]">
      {props[0].period.map((period, index) => (
        <div className="relative flex items-start gap-6" key={index}>
          <time
            dateTime={convertTimestampIntl(period.startedAt)}
            className="text-N800 tablet:text-lg laptop:text-xl font-bold absolute laptop:static bg-[#F4F7FA] pr-3 laptop:pr-0"
          >
            {convertTimestampIntl(period.startedAt)}
          </time>
          <div className="border-t-2 border-N800/20 flex justify-center py-5 laptop:px-2 flex-grow mt-3">
            {period.event && (
              <span className="text-N800 tablet:text-lg laptop:text-xl font-bold">
                {period.event}
              </span>
            )}
            {period.room && period.room.length > 0 && (
              <div className="grid laptop:grid-cols-2 gap-3 w-full mt-4 laptop:mt-0">
                <AnimatePresence>
                  {period.room.map((speaker, index) => (
                    <ScheduleCard
                      key={index}
                      isKeynote={speaker.isKeynote}
                      {...speaker}
                      onClick={() => handlerCardClick(speaker)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      ))}
      <AnimatePresence>
        {speakerModal.content && speakerModal.isOpen && (
          <SpeakerModal
            {...speakerModal.content}
            onClose={() => handlerModalClose()}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schedule;
