import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
import Data from "@/components/data/data.json";
import Card from "../components/Card";

const INSIDE_COLOR = ["#FEF3E2", "#FFFCE7", "#F3F7E8", "#E4F2F0", "#E8EFFA"];
const OUTSIDE_COLOR = ["#F79022", "#F8E038", "#9CBC43", "#599389", "#556E85"];

const JoinCommunity = () => {
  return (
    <section className="w-full py-12 tablet:py-24 relative">
      <div className="w-[min(90%,1062px)] mx-auto">
        <BlockTitleArrow>社群組織</BlockTitleArrow>
        <h4 className="block-title mb-10">
          MOPCON <span className="text-light-green">參與社群</span>
        </h4>
      </div>
      <div className="w-[min(90%,1280px)] mx-auto grid grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] gap-6 py-6">
        {Data.community.map((item, index) => (
          <Card
            key={item.id}
            {...item}
            insideColor={INSIDE_COLOR[index % INSIDE_COLOR.length]}
            outsideColor={OUTSIDE_COLOR[index % OUTSIDE_COLOR.length]}
          />
        ))}
      </div>
    </section>
  );
};

export default JoinCommunity;
