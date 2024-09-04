import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
const StudentTicket = () => {
  return (
    <section className="w-full py-12 tablet:py-24 relative">
      <div className="w-[min(90%,1062px)] mx-auto">
        <BlockTitleArrow>STUDENT DISCOUNT</BlockTitleArrow>
        <h4 className="block-title mb-10">
          還是 <span className="text-light-green">學生</span> 嗎？
        </h4>
      </div>
    </section>
  );
};

export default StudentTicket;
