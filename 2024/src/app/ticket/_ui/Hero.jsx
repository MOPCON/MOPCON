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
          現在就跟我們
          <span className="text-light-green">一起參與這場盛會</span>
        </HeroTitle>
        <HeroContent>
          <p>
            不管你是新手入村，還是專家級高手，都歡迎共同參與每天精彩的議程。我們針對不同族群需求，開出各種票種，就是希望每個人都可以找到最適合自己的方案，年輕學生可以選擇以划算價格來現場見到心中的大神，或你是超級VIP，就可以享有更多好康。
          </p>
        </HeroContent>
      </div>
    </HeroSection>
  );
};

export default Hero;
