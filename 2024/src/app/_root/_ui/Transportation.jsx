"use client";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("./TransCard"), { ssr: false });

const cardContents = [
  {
    id: 0,
    icon: "bus",
    title: "公車 Bus",
    content: "搭乘紅21、紅22、168環狀東幹線至高雄展覽館站",
    bgColor: "bg-[#FFFCE7]",
  },
  {
    id: 1,
    icon: "mrt",
    title: "捷運 MRT",
    content: "至三多商圈站步行約10分鐘即可抵達",
    bgColor: "bg-[#E4F2F0]",
  },
  {
    id: 2,
    icon: "lightRail",
    title: "輕軌 Light Rail",
    content: "搭乘捷運紅線至三多商圈站",
    bgColor: "bg-[#E8EFFA]",
  },
  {
    id: 3,
    icon: "hsr",
    title: "高鐵 HSR",
    content: "從左營高鐵站搭乘捷運紅線至三多商圈站",
    bgColor: "bg-[#F3F7E8]",
  },
];

const Transportation = () => {
  return (
    <section className="w-[min(100%,1062px)] mx-auto">
      <h6 className="font-medium text-xl text-secondary mb-6">如何前往？</h6>
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-6 gap-y-8">
        {cardContents.map(({ icon, title, content, id, bgColor }) => (
          <Card
            icon={icon}
            title={title}
            content={content}
            bgColor={bgColor}
            key={id}
          />
        ))}
      </div>
    </section>
  );
};

export default Transportation;
