import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import {
  SectionBlock,
  SectionTitle,
  SectionSubTitle,
} from "@/components/ui/SectionBlock";

const BePartner = () => {
  return (
    <SectionBlock>
      <div className="w-[min(90%,1062px)] mx-auto mb-10 tablet:mb-28">
        <SectionTitle arrowTitle="加入我們" className="mb-3">
          想成為 <span className="text-light-green">我們的夥伴嗎？</span>
        </SectionTitle>
        <SectionSubTitle>
          想了解加入贊助商，會遇到什麼樣的與會民眾嗎？
        </SectionSubTitle>
      </div>
      <div className="grid grid-cols-1 tablet:grid-cols-2 w-[min(90%,1280px)] gap-y-14 tablet:gap-4 mx-auto">
        <Image
          src={getImageSrc("/sponsor/be-partner-bg.webp")}
          alt="2023Sponsor"
          width={563}
          height={352}
          className="w-full h-full max-w-[560px] object-cover object-center"
        />
        <div>
          <ul className="text-N800 opacity-80 font-medium text-lg tablet:text-xl mb-14 tablet:mb-16">
            <li className="mb-2">
              # 濁水溪以南<span className="text-orange">破千人研討會</span>
            </li>
            <li className="mb-2">
              # 與會者以<span className="text-orange">軟體開發者</span>
              居多，也有
              <span className="text-orange">設計師、學生</span>等等
            </li>
            <li>
              # 每年超過 30 場
              <span className="text-orange">
                高品質議程，邀請超過 25 位講師
              </span>
            </li>
          </ul>
          <div className="text-N800 opacity-80 font-medium">
            <p className="text-xl mb-3">參與者目的</p>
            <ul className="font-normal text-N800 text-lg">
              <li className="flex items-center gap-2 mb-2">
                <span className="font-medium bg-gradient-to-r from-secondary to-light-green bg-clip-text text-transparent">
                  Top 1
                </span>
                <span>支持濁水溪以南科技研討會</span>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <span className="font-medium bg-gradient-to-r from-secondary to-light-green bg-clip-text text-transparent">
                  Top 2
                </span>
                <span>想聽取不同領域的相關議題</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium bg-gradient-to-r from-secondary to-light-green bg-clip-text text-transparent">
                  Top 3
                </span>
                <span>有感興趣的議題</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionBlock>
  );
};

export default BePartner;
