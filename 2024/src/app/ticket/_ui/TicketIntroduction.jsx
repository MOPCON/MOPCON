import TicketData from "@/components/data/data.json";
import TicketCard from "../components/TicketCard";
import { SectionBlock, SectionTitle } from "@/components/ui/SectionBlock";

const TicketIntroduction = () => {
  const normalTicket = TicketData.tickets.filter(
    (item) => item.isStudent === false
  );

  return (
    <SectionBlock>
      <div className="w-[min(90%,1062px)] mx-auto">
        <SectionTitle arrowTitle="TICKETS" className="mb-10">
          票種 <span className="text-light-green">介紹</span>
        </SectionTitle>
      </div>
      <div className="mx-auto w-[min(90%,1196px)]">
        <div className="grid grid-cols-1 mob:grid-cols-2 tablet:grid-cols-4 gap-4 justify-between">
          {normalTicket.map((item, index) => {
            return (
              <TicketCard
                {...item}
                key={item.id}
                color={
                  item.id === 1 || item.id === 2
                    ? "bg-gradient-to-r from-[#E8EFFA] to-[#AEBECF]"
                    : "bg-gradient-to-r from-[#E4F2F0] to-[#96CAC3]"
                }
                textColor={
                  item.id === 1 || item.id === 2
                    ? "text-[#556E85]"
                    : "text-[#53867C]"
                }
                hover={
                  item.id === 1 || item.id === 2
                    ? "hover:from-[#556E85] hover:to-[#556E85] hover:text-white"
                    : "hover:from-[#53867C] hover:to-[#53867C] hover:text-white"
                }
                index={index}
              />
            );
          })}
        </div>
      </div>
    </SectionBlock>
  );
};

export default TicketIntroduction;
