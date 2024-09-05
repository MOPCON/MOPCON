import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
import TicketData from "@/components/data/data.json";
import TicketCard from "../components/TicketCard";

const StudentTicket = () => {
  const studentTicketList = TicketData.tickets.filter(
    (item) => item.isStudent === true
  );

  return (
    <section className="w-full py-12 tablet:py-24 relative">
      <div className="w-[min(90%,1062px)] mx-auto mb-10 tablet:mb-14 laptop:mb-20">
        <BlockTitleArrow>STUDENT DISCOUNT</BlockTitleArrow>
        <h4 className="block-title mb-3">
          還是 <span className="text-light-green">學生</span> 嗎？
        </h4>
        <h5 className="text-secondary text-lg tablet:text-2xl">
          我們提供學生更優惠的價格，歡迎年輕學子一同參與盛會，和業界多多交流！
        </h5>
      </div>
      <div className="mx-auto w-[min(90%,1196px)]">
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-4 justify-between">
          {studentTicketList.map((item) => {
            return (
              <TicketCard
                {...item}
                key={item.id}
                color={"bg-gradient-to-r from-[#FEF3E2] to-[#FDCD87]"}
                textColor={"text-orange"}
                hover={"hover:from-orange hover:to-orange hover:text-white"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StudentTicket;
