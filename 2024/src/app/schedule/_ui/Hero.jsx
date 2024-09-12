import {
  HeroSection,
  HeroTitle,
  HeroContent,
} from "@/components/ui/HeroSection";

const Hero = () => {
  return (
    <HeroSection>
      <HeroTitle className="flex flex-col justify-start tablet:block tablet:text-center">
        <span>每一場都讓你收穫滿滿的</span>
        <span className="text-light-green">議程規劃</span>
      </HeroTitle>
      <HeroContent>
        <p className="mb-3">
          MOPCON
          2024，將帶你探索技術之樹的每一條分枝，從基礎知識到前沿趨勢，無論你是哪一個分枝的探險者，都能在這裡找到屬於自己的知識之路，親身感受技術的脈動、在未來之林中開創屬於自己的方向。
        </p>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
