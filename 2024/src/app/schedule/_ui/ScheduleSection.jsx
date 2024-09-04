import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
import DaySwitchButton from "../components/DaySwitchButton";

const ScheduleSection = () => {
  return (
    <section className="w-full py-12 tablet:py-24 relative bg-[#F4F7FA]">
      <div className="w-[min(90%,1062px)] mx-auto">
        <BlockTitleArrow>議程表</BlockTitleArrow>
        <h4 className="block-title mb-10">精彩議程</h4>
      </div>
      <div className="w-[min(90%,1280px)] mx-auto">
        <DaySwitchButton />
      </div>
    </section>
  );
};

export default ScheduleSection;
