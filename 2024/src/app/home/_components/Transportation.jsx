import {
  Bus,
  MRT,
  HSR,
  LightRail,
  ExternalLink,
} from "@/app/home/_components/icons";

const Card = ({ icon, title, content }) => {
  const iconMapping = {
    bus: Bus,
    mrt: MRT,
    hsr: HSR,
    lightrail: LightRail,
  };

  const IconComponent = iconMapping[icon.toLowerCase()];

  return (
    <div className="group w-full border border-transparent rounded-xl px-5 py-4 transition-all duration-300 hover:border-secondary hover:shadow-[0_2px_6px_0_rgba(156,188,67,0.3),0_13px_12px_0_rgba(156,188,67,0.05),0_24px_15px_0_rgba(156,188,67,0.05),0_40px_16px_0_rgba(156,188,67,0.05),0_62px_17px_0_rgba(156,188,67,0.05)]">
      <div className="font-bold text-lg text-black flex items-center gap-2 transition-colors duration-300 group-hover:text-secondary">
        {IconComponent && (
          <IconComponent className="stroke-black group-hover:stroke-secondary transition-colors duration-300" />
        )}
        {title}
      </div>
      <p className="paragraph">{content}</p>
    </div>
  );
};

const Transportation = () => {
  return (
    <section className="w-[min(84%,1204px)] mx-auto py-24 mb-10">
      <h4 className="block-title text-center">交通方式</h4>
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 my-10 tablet:mt-14 tablet:mb-20">
        <Card
          icon="bus"
          title="公車 Bus"
          content="搭乘紅21、紅22、168環狀東幹線至高雄展覽館站"
        />
        <Card
          icon="hsr"
          title="高鐵 HSR"
          content="從左營高鐵站搭乘捷運紅線至三多商圈站"
        />
        <Card
          icon="mrt"
          title="捷運 MRT"
          content="至三多商圈站步行約10分鐘即可抵達"
        />
        <Card
          icon="lightRail"
          title="輕軌 Light Rail"
          content="至軟體園區站步行約5分鐘即可抵達"
        />
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
