import ScheduleCard from "./ScheduleCard";

const Schedule = ({ ...props }) => {
  return (
    <div className="max-w-[1200px]">
      {props[0].period.map((period, index) => (
        <div className="flex items-start gap-6" key={index}>
          <time className="text-N800 text-xl font-bold">
            {period.startedAt}
          </time>
          <div className="border-t-2 border-N800/20 flex justify-center py-5 px-2 flex-grow mt-3">
            {period.event && (
              <span className="text-N800 text-xl font-bold">
                {period.event}
              </span>
            )}
            {period.room && period.room.length > 0 && (
              <div className="grid laptop:grid-cols-2 gap-3 w-full">
                {period.room.map((room, index) => (
                  <ScheduleCard key={room.speakerId} {...room} />
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
