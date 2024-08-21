"use client";
import { ExternalLink } from "./icons";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("./TransCard"), { ssr: false });
import { useState } from "react";

const cardContents = [
  {
    id: 0,
    icon: "bus",
    title: "公車 Bus",
    content: "搭乘紅21、紅22、168環狀東幹線至高雄展覽館站",
  },
  {
    id: 1,
    icon: "hsr",
    title: "高鐵 HSR",
    content: "從左營高鐵站搭乘捷運紅線至三多商圈站",
  },
  {
    id: 2,
    icon: "mrt",
    title: "捷運 MRT",
    content: "至三多商圈站步行約10分鐘即可抵達",
  },
  {
    id: 3,
    icon: "lightRail",
    title: "輕鐵 Light Rail",
    content: "搭乘捷運紅線至三多商圈站",
  },
];

const Transportation = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="w-[min(84%,1204px)] mx-auto py-24 mb-10">
      <h4 className="block-title">交通方式</h4>
      <div
        className="grid grid-cols-1 tablet:grid-cols-2 my-10 gap-6 tablet:mt-14 tablet:mb-20"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {cardContents.map(({ icon, title, content, id }) => (
          <Card
            icon={icon}
            title={title}
            content={content}
            idx={id}
            key={id}
            onHover={() => setHoveredIndex(id)}
            isHovered={hoveredIndex === id}
          />
        ))}
      </div>
      <a
        className="btn btn-primary rounded-full border-2 group flex items-center gap-2 w-fit mx-auto text-xl"
        href="https://goo.gl/maps/KERub4DGSAztf57c7"
        target="_blank"
        rel="noreferrer noopener"
      >
        <ExternalLink className="stroke-white group-hover:stroke-secondary transition-colors duration-300:" />
        Google Map
      </a>
    </section>
  );
};

export default Transportation;
