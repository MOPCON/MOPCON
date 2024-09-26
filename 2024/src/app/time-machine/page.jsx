import { Fragment } from "react";
import Hero from "./_ui/Hero";
import TimeMachineBlock from "./_ui/TimeMachineBlock";

export const metadata = {
  title: "時光機",
  description:
    " MOPCON 全名為 Mobile Open Platform Conference，為非營利的技術研討會，成立宗旨為針對移動通訊領域結合實際的產業面與工程研發做比較深入的探討",
};

const Page = () => {
  return (
    <Fragment>
      <Hero />
      <TimeMachineBlock />
    </Fragment>
  );
};

export default Page;
