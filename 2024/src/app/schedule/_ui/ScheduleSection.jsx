"use client";
import React, { useState, useMemo } from "react";
import DaySwitchButton from "../components/DaySwitchButton";
import Schedule from "../components/Schedule";
import scheduleData from "@/components/data/schedule.json";
import { useRouter, useSearchParams } from "next/navigation";

import CategoryButtons from "@/components/CategoryButtons";

const ScheduleSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryDay = Number(searchParams.get("days") || 0);
  const [tags, setTags] = useState([]);
  const [schedules, setSchedules] = useState([scheduleData[queryDay || 0]]);
  const [activeDay, setActiveDay] = useState(queryDay || 0);

  const handleTag = (tag) => {
    if (tags.map((item) => item.id).includes(tag.id)) {
      setTags(tags.filter((item) => item.id !== tag.id));
    } else {
      setTags([...tags, { ...tag }]);
    }
  };

  const handleDaySwitch = (day) => {
    setSchedules([scheduleData[day]]);
    setActiveDay(day);
    router.push(`/schedule/?days=${day}`, { scroll: false });
  };

  const filteredSchedule = useMemo(() => {
    return schedules.map((schedule) => ({
      ...schedule,
      period: schedule.period.map((period) => ({
        ...period,
        room: period.room.filter(
          (speaker) =>
            tags.length === 0 ||
            speaker.tags.some((speakerTag) =>
              tags.some((tag) => tag.id === speakerTag.id)
            )
        ),
      })),
    }));
  }, [schedules, tags]);

  return (
    <div className="w-[min(90%,1280px)] mx-auto">
      <DaySwitchButton handleDays={handleDaySwitch} activeDay={activeDay} />
      <CategoryButtons handleTag={handleTag} tags={tags} />
      <Schedule {...filteredSchedule} />
    </div>
  );
};

export default ScheduleSection;
