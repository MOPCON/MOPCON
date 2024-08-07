import { Fragment } from "react";
import Image from "next/image";
import { Link } from "next/link";
import dynamic from "next/dynamic";
import {
  Bus,
  MRT,
  HSR,
  LightRail,
  ExternalLink,
} from "@/components/icons/icons";
import { getImageSrc } from "@/components/util/getImageSrc";

const SponsorSwiper = dynamic(() => import("@/components/ui/SponsorSwiper"));

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

export default function Home() {
  return (
    <Fragment>
      <section className="w-[min(90%,860px)] mx-auto min-h-[calc(100dvh-102px)] tablet:min-h-[calc(100dvh-132px)] flex flex-col gap-5 justify-center items-center py-12">
        <h1 className="font-bold text-5xl text-darkest-green text-center">
          MOPCON x INSPIRATION
        </h1>
        <h2 className="font-medium text-2xl text-black underline decoration-1 underline-offset-4 text-center block">
          Oct.26-27 高雄展覽館 Kaohsiung Exhibition Center
        </h2>
        <div className="mob:w-full tablet:w-10/12 mx-auto">
          <p className="paragraph mb-5">
            晶片與算力成為現代科技工業的原物料，資料成為新世代科技的石油，推動
            LLM 與各種 Generative AI 算力發展到現在，證明了 Software-Defined
            將成為各種核心技術的關鍵字。而行動聯網技術搭配了日漸強大的邊緣運算，也讓二十世紀科幻電影場景逐漸在我們眼前實現，在這個萬般皆運算，所有物品都聯網的世代，所有未來的想像越來越寬廣。
          </p>
          <p className="paragraph">
            無論受到既有人類技術引發的靈感、科幻電影的啟發又或是 Generative AI
            鼓舞的點子，MOPCON 2024 選擇以 Inspiration
            為年度議題，讓我們一起尋找未來行動科技的敲門磚。
          </p>
        </div>
        <div className="flex flex-col mob:flex-row w-full mob:w-fit items-center gap-3 mt-10">
          <a
            href="https://mopcon.kktix.cc/events/mopcon-2024-cfp"
            className="btn btn-primary w-full"
            rel="noopener noreferrer"
            target="_blank"
          >
            前往投稿
          </a>
          <a
            href="https://mopcon.kktix.cc/events/mopcon-2024-cfr"
            className="btn btn-secondary w-full"
            rel="noopener noreferrer"
            target="_blank"
          >
            推薦講者
          </a>
        </div>
      </section>
      <section className="w-[min(90%,1204px)] mx-auto py-16">
        <article className="grid grid-cols-1 laptop:grid-cols-6 laptop:grid-rows-5 gap-y-5 gap-x-10 laptop:gap-x-20">
          <div className="flex items-center justify-center rounded-2xl overflow-clip flex-shrink-0 col-start-1 row-start-2 laptop:col-span-3 laptop:row-span-3">
            <Image
              className="object-cover w-full h-full max-w-full"
              src={getImageSrc("/img/2023-mopcon.webp")}
              width={522}
              height={380}
              alt="MOPCON 活動照片"
            />
          </div>
          <div className="mb-5 laptop:mb-0 col-start-1 row-start-1 laptop:col-span-3 laptop:col-start-4">
            <h2 className="block-title text-center text-[31px] tablet:text-[39px]">
              關於 MOPCON
            </h2>
            <h3 className="font-medium mt-5 text-xl gap-2 laptop:gap-0 text-black underline decoration-1 underline-offset-4 text-center flex justify-center flex-col laptop:flex-row">
              <span>聚集知識與人才</span>
              <span className="hidden laptop:inline-block">X</span>{" "}
              <span> 南台灣最大行動科技年會 </span>{" "}
              <span className="hidden laptop:inline-block">X</span>{" "}
              <span>放大科技創新力</span>
            </h3>
          </div>
          <div className="col-start-1 mt-5 laptop:mt-0 row-start-4 laptop:col-span-3 laptop:row-span-2 laptop:col-start-4 laptop:row-start-2">
            <p className="paragraph">
              MOPCON（Mobile Open Platform Conference）再度來襲！從 2012
              年開始，我們已經度過 11 個年頭，從 160 人的小型聚會，逐漸成為 1000
              人以上的科技盛宴！MOPCON 集結了獨立開發者、軟體工程師、UI/UX
              設計師、軟體資料科學家、自造者、專業經理人、創業家、相關科系學生等多元背景，在這裡，我們一同探索科技的無限可能，互相啟發、互動交流。
            </p>
            <p className="paragraph  mt-5">
              MOPCON
              不僅是一場盛會，更是多元資訊技術交流的港口！這裡匯聚了來自不同背景和領域的專業人士，共同分享經驗和知識，拓寬視野，激發創意。2024
              年，我們將以「Inspiration」為主題，深入探討前沿技術的實際應用與跨界整合，從
              AI
              到跨平台、行動應用到雲服務，讓我們一起揮灑創意，共同塑造科技未來的精彩！準備好了嗎？讓我們一起在
              MOPCON 2024 尋找未來世界的敲門磚吧！
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 laptop:mt-20 col-start-1 row-start-3 laptop:col-span-6 laptop:row-span-2 laptop:row-start-4">
            <h4 className="flex items-center justify-center flex-col font-bold text-black laptop:text-[31px]">
              <span>持續舉辦</span>
              <span className="text-[40px] laptop:text-[80px] text-orange">
                12
              </span>
              <span>年</span>
            </h4>
            <h4 className="flex items-center justify-center flex-col font-bold text-black laptop:text-[31px]">
              <span>精彩議程</span>
              <span className="text-[40px] laptop:text-[80px] bg-gradient-to-r from-orange to-yellow bg-clip-text text-transparent">
                30
              </span>
              <span>場以上</span>
            </h4>
            <h4 className="flex items-center justify-center flex-col font-bold text-black laptop:text-[31px]">
              <span>熱情會眾</span>
              <span className="text-[40px] laptop:text-[80px] text-yellow">
                1000
              </span>
              <span>人以上</span>
            </h4>
          </div>
        </article>
      </section>
      <section className="w-[min(90%,1204px)] mx-auto flex flex-col items-center justify-center gap-8 laptop:gap-[4rem] py-16">
        <div className="flex flex-col gap-4 w-full">
          <h4 className="block-title text-center">會場</h4>
          <p className="paragraph text-center leading-7">
            高雄展覽館 Kaohsiung Exhibition Center
            <br />
            高雄市前鎮區成功二路39號
          </p>
          <div className="flex flex-col mob:flex-row w-full mx-auto mob:w-fit items-center gap-3 mt-4">
            <a
              href="https://www.kecc.com.tw/traffic"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              場地資訊
            </a>
            <a
              href="https://www.kecc.com.tw/rental-venue"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full"
            >
              場館地圖
            </a>
          </div>
        </div>
        <div className="w-full rounded-3xl overflow-hidden border-2 border-secondary">
          <Image
            className="object-cover w-full h-full max-w-full"
            src={getImageSrc("/img/Exhibition-Center.webp")}
            width={1204}
            height={629}
            alt="高雄展覽館"
          />
        </div>
      </section>
      <section className="w-[min(84%,1204px)] mx-auto py-16 mb-10">
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
      {/* <section className="pt-16 pb-20 mb-32">
        <h4 className="block-title text-center mb-12">贊助夥伴</h4>
        <SponsorSwiper />
      </section> */}
    </Fragment>
  );
}
