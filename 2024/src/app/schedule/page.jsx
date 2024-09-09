import { Fragment } from "react";
import Hero from "./_ui/Hero";
import ScheduleSection from "./_ui/ScheduleSection";

export const metadata = {
  title: "主要議程",
  description:
    "MOPCON 2024，將帶你探索技術之樹的每一條分枝，從基礎知識到前沿趨勢，無論你是哪一個分枝的探險者，都能在這裡找到屬於自己的知識之路，親身感受技術的脈動、在未來之林中開創屬於自己的方向。",
};
const Page = () => {
  return (
    <Fragment>
      <Hero />
      <ScheduleSection />
    </Fragment>
  );
};

export default Page;
