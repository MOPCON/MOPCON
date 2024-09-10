import TicketData from "@/components/data/data.json";
import TicketCard from "../components/TicketCard";
import {
  SectionBlock,
  SectionTitle,
  SectionSubTitle,
} from "@/components/ui/SectionBlock";

const StudentTicket = () => {
  const studentTicketList = TicketData.tickets.filter(
    (item) => item.isStudent === true
  );

  return (
    <SectionBlock>
      <div className="w-[min(90%,1062px)] mx-auto mb-10 tablet:mb-14 laptop:mb-20">
        <SectionTitle arrowTitle="STUDENT DISCOUNT" className="mb-3">
          還是 <span className="text-light-green">學生</span> 嗎？
        </SectionTitle>
        <SectionSubTitle>
          我們提供學生更優惠的價格，歡迎年輕學子一同參與盛會，和業界多多交流！
        </SectionSubTitle>
      </div>
      <div className="mx-auto w-[min(90%,1196px)]">
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-4 justify-between">
          {studentTicketList.map((item, index) => {
            return (
              <TicketCard
                {...item}
                key={item.id}
                color={"bg-gradient-to-r from-[#FEF3E2] to-[#FDCD87]"}
                textColor={"text-orange"}
                hover={"hover:from-orange hover:to-orange hover:text-white"}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </SectionBlock>
  );
};

export default StudentTicket;
