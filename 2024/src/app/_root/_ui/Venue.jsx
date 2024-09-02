import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";
import {
  BgDecorationOne,
  BgDecorationTwo,
  BgDecorationFour,
} from "./bg-decoration";
import Transportation from "./Transportation";
import BlockTitleArrow from "@/components/ui/BlockTitleArrow";

const Venue = () => {
  return (
    <section className="w-[min(90%,1280px)] mx-auto py-12 tablet:py-24">
      <div className="w-[min(100%,1062px)] mx-auto mb-16">
        <BlockTitleArrow>舉辦地點</BlockTitleArrow>
        <h4 className="block-title">會場資訊</h4>
      </div>
      <div className="grid grid-cols-1 tablet:grid-cols-5 items-center gap-4 mb-20">
        <div className="tablet:col-start-1 tablet:col-end-4 relative mb-12">
          <div className="w-full tablet:w-10/12 rounded-3xl mx-auto overflow-hidden shadow-[10px_10px_50px_0px_rgba(0,0,0,0.15)]">
            <Image
              className="object-cover size-full max-w-full"
              src={getImageSrc("/img/Exhibition-Center.webp")}
              width={1204}
              height={629}
              alt="高雄展覽館場地資訊"
            />
          </div>
          <BgDecorationOne
            className={
              "absolute bottom-0 left-0 translate-y-1/4 translate-x-6 hidden tablet:block"
            }
          />
          <BgDecorationTwo
            className={
              "absolute bottom-0 right-0 -translate-x-20 translate-y-4 hidden tablet:block"
            }
          />
          <BgDecorationFour
            className={
              "absolute bottom-0 right-0 -scale-x-100 -translate-x-8 translate-y-8 -z-10 hidden tablet:block"
            }
          />
        </div>
        <div className="flex flex-col gap-10 tablet:col-start-4 tablet:col-end-6">
          <div className="flex flex-col gap-4 font-medium">
            <span className="text-lg tablet:text-xl text-secondary">
              在哪裡呢？
            </span>
            <span className="text-xl tablet:text-2xl text-N800 flex flex-col tablet:block">
              <span>高雄展覽館</span>
              <span>Kaohsiung Exhibition Center</span>
            </span>
          </div>
          <div className="flex flex-col gap-4 font-medium">
            <span className="text-lg tablet:text-xl text-secondary">地址</span>
            <div>
              <span className="text-xl tablet:text-2xl text-N800">
                高雄市前鎮區成功二路39號
              </span>
              <Link
                href="https://www.google.com/maps/place/高雄市前鎮區成功二路39號"
                target="_blank"
                rel="noreferrer noopener"
                className="text-light-green text-lg tablet:text-xl font-medium flex items-center gap-1 mt-1"
              >
                Google Map
                <RxExternalLink />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Transportation />
    </section>
  );
};

export default Venue;
