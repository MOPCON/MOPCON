import React from "react";
import {
  HeroSection,
  HeroTitle,
  HeroContent,
} from "@/components/ui/HeroSection";

const Hero = () => {
  return (
    <HeroSection>
      <HeroTitle className="tablet:text-center flex flex-col tablet:block">
        我們在打造
        <span className="text-light-green">高速資訊交流圈</span>
      </HeroTitle>
      <HeroContent>
        <p className="mb-3">
          MOPCON
          是一個專注於濁水溪以南地區的科技社群。自創立以來，我們致力於為南台灣提供一個討論技術與交流的平台。我們深知南部地區的人才和技術資源豐富，但往往缺乏能夠匯聚這些力量的場域。因此，我們的目標是提供一個專注於南部社群的舞台，讓每位社群夥伴都能夠在這裡一同交流、成長，創造共好生態系。
        </p>
        <p className="mb-3">
          無論你是對最新的科技趨勢充滿好奇，還是想要尋找實際的技術解決方案，MOPCON
          2024
          都將為你提供豐富的內容和多樣的活動。我們希望促進南部地區的科技發展，並為在地社群帶來更多的機會與挑戰。
        </p>
        <p className="text-secondary">
          <span className="bg-highlight box-decoration-clone break-before-all w-fit">
            MOPCON 志在打造出一座「高速資訊交流圈」！
          </span>
        </p>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
