import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
import Data from "@/components/data/data.json";
import Card from "../components/Card";
import { SectionBlock, SectionTitle } from "@/components/ui/SectionBlock";

const INSIDE_COLOR = ["#FEF3E2", "#FFFCE7", "#F3F7E8", "#E4F2F0", "#E8EFFA"];
const OUTSIDE_COLOR = ["#F79022", "#F8E038", "#9CBC43", "#599389", "#556E85"];

const JoinCommunity = () => {
  return (
    <SectionBlock>
      <div className="w-[min(90%,1062px)] mx-auto">
        <SectionTitle arrowTitle="社群組織" className="mb-14">
          MOPCON <span className="text-light-green">參與社群</span>
        </SectionTitle>
      </div>
      {Data.community.map((item, index) => (
        <div className="w-[min(90%,1280px)] mx-auto">
          <h3 className="font-bold tablet:text-[32px] text-xl text-[#1C1F25] mb-6 tablet:ms-28">
            {item.title}
          </h3>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] gap-6 py-6 mb-10">
            {item.organizations.map((organization, index) => (
              <Card
                key={organization.id}
                {...organization}
                insideColor={INSIDE_COLOR[index % INSIDE_COLOR.length]}
                outsideColor={OUTSIDE_COLOR[index % OUTSIDE_COLOR.length]}
              />
            ))}
          </div>
        </div>
      ))}
    </SectionBlock>
  );
};

export default JoinCommunity;
