import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
import TicketData from "@/components/data/data.json";
import TicketCard from "../components/TicketCard";

const TicketIntroduction = () => {
  const normalTicket = TicketData.tickets.filter(
    (item) => item.isStudent === false
  );

  return (
    <section className="w-full py-12 tablet:pt-24 tablet:pb-12 relative">
      <div className="w-[min(90%,1062px)] mx-auto">
        <BlockTitleArrow>TICKETS</BlockTitleArrow>
        <h4 className="block-title mb-10">
          票種 <span className="text-light-green">介紹</span>
        </h4>
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
                    ? "hover:from-[#556E85] hover:to-[#556E85]"
                    : "hover:from-[#53867C] hover:to-[#53867C]"
                }
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TicketIntroduction;
