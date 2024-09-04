import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
import Link from "next/link";
import TicketData from "@/components/data/data.json";

const TicketCard = ({ ...props }) => {
  return (
    <div
      className={`rounded-3xl p-0.5 shadow-[0_0_30px_rgba(0,0,0,0.05)] min-h-[280px] h-auto ${
        props.id === 1 || props.id === 2
          ? "bg-[linear-gradient(50deg,_#E8EFFA,_#AEBECF)]"
          : "bg-[linear-gradient(50deg,_#E4F2F0,_#96CAC3)]"
      }`}
    >
      <div className="size-full flex flex-col bg-white py-6 px-8 rounded-[calc(24px-2px)]">
        <div>
          <h5 className="text-2xl text-[#1C1F25] font-medium ">
            {props.title}
          </h5>
          {props.subTitle && (
            <h6 className="text-lg text-N800/70">{props.subTitle}</h6>
          )}
        </div>
        <div className="flex flex-col gap-3 mt-auto">
          <div className="text-[#1C1F25]">
            <span className="text-[40px] font-bold">{props.price}</span>
            <span className="text-2xl"> / 張</span>
          </div>
          <Link
            className={`flex items-center justify-center rounded-xl px-9 h-12 bg-slate-400 font-bold
                ${
                  props.id === 1 || props.id === 2
                    ? "bg-[linear-gradient(130deg,_#E8EFFA,_#AEBECF)]"
                    : "bg-[linear-gradient(130deg,_#E4F2F0,_#96CAC3)]"
                } ${
              props.id === 1 || props.id === 2
                ? "text-[#556E85]"
                : "text-[#53867C]"
            }`}
            href="/"
          >
            前往購票
          </Link>
        </div>
      </div>
    </div>
  );
};

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
          {normalTicket.map((item) => {
            return <TicketCard {...item} key={item.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default TicketIntroduction;
