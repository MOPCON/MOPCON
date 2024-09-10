import ScheduleCard from "./ScheduleCard";
import { convertTimestampIntl } from "@/components/util/convertTimestampIntl";

const Schedule = ({ ...props }) => {
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
                {period.room.map((speaker, index) => (
                  <ScheduleCard
                    key={index}
                    isKeynote={speaker.isKeynote}
                    {...speaker}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
