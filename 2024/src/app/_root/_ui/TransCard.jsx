"use client";
import { Bus, MRT, HSR, LightRail } from "./icons";

const Card = ({ icon, title, content, bgColor }) => {
  const iconMapping = {
    bus: Bus,
    mrt: MRT,
    hsr: HSR,
    lightrail: LightRail,
  };

  const IconComponent = iconMapping[icon.toLowerCase()];

  return (
    <div className="size-full block rounded-xl">
      <div className="flex items-center gap-5">
        <div
          className={`flex-shrink-0 rounded-2xl size-[72px] flex items-center justify-center ${bgColor}`}
        >
          {IconComponent && <IconComponent />}
        </div>
        <div className="text-N800 flex-grow">
          <h6 className="text-lg tablet:text-2xl font-medium mb-2">{title}</h6>
          <p className="text-base tablet:text-lg">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
