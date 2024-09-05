import React from "react";
import Link from "next/link";
import BlockTitleArrow from "@/components/ui/BlockTitleArrow";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";

const JoinTeam = () => {
  return (
    <section className="w-full py-12 tablet:py-24">
      <div className="w-[min(90%,1062px)] mx-auto mb-10 tablet:mb-28">
        <BlockTitleArrow>志工行列</BlockTitleArrow>
        <h4 className="block-title mb-10 tablet:mb-28">
          MOPCON <span className="text-light-green">志工團隊</span>
        </h4>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-14">
          <div className="flex flex-col gap-10 w-[min(100%,410px)] mx-auto">
            <h5 className="text-[#1C1F25] text-xl tablet:text-[32px] font-medium mx-auto">
              「我想加入志工！」
            </h5>
            <div className="h-60 flex items-center justify-center">
              <Image
                src={getImageSrc("/community/team.webp")}
                width={410}
                height={240}
                alt="team"
                className="size-full object-contain"
              />
            </div>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/mopcon"
              className="btn btn-primary max-w-full w-72 mx-auto"
            >
              追蹤 Facebook
            </Link>
            <p className="text-N800 tablet:text-lg">
              想要和我們一起改變南部資訊生態圈嗎？歡迎追蹤我們的
              Facebook，我們會在下一屆準備開始前 PO
              出徵才資訊！加入我們不僅有機會參與改變的過程，還可以得到寶貴的辦展經驗、認識大神們哦！
            </p>
          </div>
          <div className="flex flex-col gap-10 w-[min(100%,410px)] mx-auto">
            <h5 className="text-[#1C1F25] text-xl tablet:text-[32px] font-medium mx-auto">
              「我有興趣贊助！」
            </h5>
            <div className="h-60 flex items-center justify-center">
              <Image
                src={getImageSrc("/community/sponsor.webp")}
                width={358}
                height={240}
                alt="team"
                className="size-full object-contain"
              />
            </div>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:mailto:sponsor@mopcon.org"
              className="btn btn-primary max-w-full w-72 mx-auto"
            >
              我有興趣贊助
            </Link>
            <p className="text-N800 tablet:text-lg">
              謝謝你願意成為全台最大行動科技領域社群研討會的參與者及貢獻者之一
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeam;
