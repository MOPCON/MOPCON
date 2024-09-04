import Link from "next/link";

const TicketCard = ({ ...props }) => {
  const LinkButton = (props) => {
    if (props.isSelling) {
      if (props.isSellOut) {
        return (
          <div
            className={`flex items-center justify-center rounded-xl px-9 h-12 bg-slate-400 font-bold ${
              props.color
            } ${[props.textColor]} pointer-events-none`}
            aria-label={"已完售"}
            title={"已完售"}
          >
            已完售
          </div>
        );
      } else {
        return (
          <Link
            className={`flex items-center justify-center rounded-xl px-9 h-12 bg-slate-400 font-bold ${
              props.color
            } ${[props.textColor]} ${props.hover}`}
            href={props.link}
            rel="noopener noreferrer"
            target="_blank"
            aria-label={"前往購票"}
            title={"前往購票"}
          >
            前往購票
          </Link>
        );
      }
    } else {
      return (
        <div
          className={`flex items-center justify-center rounded-xl px-9 h-12 bg-slate-400 font-bold
                ${props.color} ${[props.textColor]} pointer-events-none`}
          aria-label={"即將開售"}
          title={"即將開售"}
        >
          即將開售
        </div>
      );
    }
  };

  return (
    <div
      className={`rounded-3xl p-0.5 shadow-[0_0_30px_rgba(0,0,0,0.05)] min-h-[280px] h-auto ${props.color}`}
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
          <LinkButton {...props} />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
