import {
  HeroSection,
  HeroTitle,
  HeroContent,
} from "@/components/ui/HeroSection";

const Hero = () => {
  return (
    <HeroSection>
      <div className="w-[min(90%,1280px)] mx-auto mb-8 tablet:mb-16">
        <HeroTitle className="text-center">
          啟動 MOPCON
          <span className="text-light-green">時光機</span>
        </HeroTitle>
        <HeroContent>
          <p>
            MOPCON 全名為 Mobile Open Platform
            Conference，為非營利的技術研討會，成立宗旨為針對移動通訊領域結合實際的產業面與工程研發做比較深入的探討
          </p>
        </HeroContent>
      </div>
    </HeroSection>
  );
};

export default Hero;
