import BlockTitleArrow from "@/components/ui/BlockTitleArrow";

const JoinCommunity = () => {
  return (
    <section className="w-full py-12 tablet:py-24 relative">
      <div className="w-[min(90%,1062px)] mx-auto">
        <BlockTitleArrow>社群組織</BlockTitleArrow>
        <h4 className="block-title mb-10">
          MOPCON <span className="text-light-green">參與社群</span>
        </h4>
      </div>
      <div className="w-[min(90%,1280px)] mx-auto grid grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] gap-6 py-6"></div>
    </section>
  );
};

export default JoinCommunity;
