import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import Link from "next/link";
import { ExternalLink } from "./icons";
import {
  BgDecorationOne,
  BgDecorationTwo,
  BgDecorationFour,
} from "./bg-decoration";
import Transportation from "./Transportation";

const Venue = () => {
  return (
    <section className="w-[min(90%,1280px)] mx-auto py-24">
      <div className="w-[min(100%,1062px)] mx-auto mb-16">
        <div className="flex items-center gap-3 text-[#AEBECF] mb-5">
          舉辦地點
          <svg
            width="62"
            height="18"
            viewBox="0 0 62 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 9H60M60 9L55.4813 5M60 9L55.4813 13"
              stroke="#AEBECF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h4 className="block-title">會場資訊</h4>
      </div>
      <div className="grid grid-cols-1 tablet:grid-cols-5 items-center gap-4 mb-20">
        <div className="tablet:col-start-1 tablet:col-end-4 relative mb-12">
          <div className="w-10/12 rounded-3xl mx-auto overflow-hidden shadow-[10px_10px_50px_0px_rgba(0,0,0,0.15)]">
            <Image
              className="object-cover size-full max-w-full"
              src={getImageSrc("/img/Exhibition-Center.webp")}
              width={1204}
              height={629}
              alt="高雄展覽館場地資訊"
            />
          </div>
          <BgDecorationOne
            className={"absolute bottom-0 left-0 translate-y-1/4 translate-x-6"}
          />
          <BgDecorationTwo
            className={
              "absolute bottom-0 right-0 -translate-x-20 translate-y-4"
            }
          />
          <BgDecorationFour
            className={
              "absolute bottom-0 right-0 -scale-x-100 -translate-x-8 translate-y-8 -z-10"
            }
          />
        </div>
        <div className="flex flex-col gap-10 tablet:col-start-4 tablet:col-end-6">
          <div className="flex flex-col gap-4 font-medium">
            <span className="text-xl text-secondary">在哪裡呢？</span>
            <span className="text-2xl text-N800">
              高雄展覽館 Kaohsiung Exhibition Center
            </span>
          </div>
          <div className="flex flex-col gap-4 font-medium">
            <span className="text-xl text-secondary">地址</span>
            <div>
              <span className="text-2xl text-N800">
                高雄市前鎮區成功二路39號
              </span>
              <Link
                href="https://www.google.com/maps/place/高雄市前鎮區成功二路39號"
                target="_blank"
                rel="noreferrer noopener"
                className="text-light-green text-xl font-medium flex items-center gap-1 mt-1"
              >
                Google Map
                <ExternalLink className={"stroke-light-green"} />
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
