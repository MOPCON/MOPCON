import Data from "@/components/data/data.json";
import { FaFacebook } from "react-icons/fa";
import { GoGlobe } from "react-icons/go";
import ModalImage from "@/components/ModalImage";
import { GrLocation } from "react-icons/gr";
import { FiCalendar } from "react-icons/fi";
import { GreenLeaf, OrangeLeaf } from "@/components/ui/ModalLeaf";
import { FiShare2 } from "react-icons/fi";
import { LuCalendarCheck } from "react-icons/lu";
import { useJsonParse } from "@/components/hook/useJsonParse";

export const generateStaticParams = async () =>
  Data.speakers.map((speaker) => ({ slug: speaker.speakerId }));

export async function generateMetadata({ params }) {
  const speaker = Data.speakers.find(
    (speaker) => String(speaker.speakerId) === String(params.id)
  );

  if (!speaker) {
    return {
      title: "找不到講者",
    };
  }

  return {
    title: speaker.name,
    description: speaker.bio,
    keywords: speaker.tags.map((tag) => tag.name),
  };
}

const Page = ({ params }) => {
  const speaker = Data.speakers.find(
    (speaker) => String(speaker.speakerId) === String(params.id)
  );

  const summary = useJsonParse(speaker.summary);
  const bio = useJsonParse(speaker.bio);

  if (!speaker) {
    return <h2>找不到講者</h2>;
  }
  return (
    <section className="w-[min(90%,860px)] mx-auto my-16 py-8">
      <div className="flex flex-col items-center mob:block mb-10">
        <div className="flex gap-3 flex-col mob:flex-row items-center w-fit mb-3">
          <div className="size-[120px] rounded-[50%] overflow-clip flex items-center justify-center">
            <ModalImage src={speaker.img} alt={speaker.name} />
          </div>
          <div className="flex flex-col items-center mob:items-start">
            <h4 className="font-bold text-[#343844] mb-2">{speaker.name}</h4>
            <div className="flex flex-col items-center mob:items-start">
              <span className="text-N800 font-medium">{speaker.company}</span>
              <span className="text-N800 font-medium">{speaker.jobTitle}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-evenly w-[120px]">
          <a
            href="#"
            rel="noreferrer noopener"
            target="_blank"
            className="text-secondary"
          >
            <GoGlobe className="text-xl" aria-label="Visit website" />
          </a>
          <a
            href="#"
            rel="noreferrer noopener"
            target="_blank"
            className="text-secondary"
          >
            <FaFacebook className="text-xl" aria-label="Visit Facebook page" />
          </a>
        </div>
      </div>
      <article className="flex flex-col gap-10 mb-10">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-N800/80 font-medium leading-6">介紹</h3>
            <OrangeLeaf />
          </div>
          <div className="text-N800/80 leading-6 flex flex-col gap-2">
            {bio}
          </div>
        </section>
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-N800/80 font-medium leading-6">議程主題</h3>
            <GreenLeaf />
          </div>
          <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 mb-4">
            <h3 className="font-bold text-N800 text-lg row-start-3 tablet:row-start-1">
              {speaker.topic}
            </h3>
            <div className="flex items-center tablet:justify-end gap-6">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-secondary" />
                <time className="text-N800/80" dateTime="2024-10-26">
                  日期，時間
                </time>
              </div>
              <div className="flex items-center gap-2">
                <GrLocation className="text-secondary" />
                <span className="text-N800/80">棟（樓）</span>
              </div>
            </div>
          </div>
          <div className="text-N800/80 leading-6 mb-4 flex flex-col gap-2">
            {summary}
          </div>
          <div className="flex items-center justify-center mob:justify-normal gap-3 flex-wrap">
            {speaker.tags.map((item) => (
              <span
                key={item.id}
                className="rounded-full px-3 py-1 text-white bg-secondary"
              >
                {item.name}
              </span>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-N800/80 font-medium leading-6 mb-4">目標會眾</h3>
          <p className="text-N800/80 leading-6">{speaker.target}</p>
        </section>
        <section>
          <h3 className="text-N800/80 font-medium leading-6 mb-4">先備知識</h3>
          <p className="text-N800/80 leading-6">{speaker.priorKnowledge}</p>
        </section>
        <section>
          <h3 className="text-N800/80 font-medium leading-6 mb-4">
            會眾預期收穫
          </h3>
          <p className="text-N800/80 leading-6">{speaker.expectedGain}</p>
        </section>
      </article>
      <div className="grid grid-cols-1 mob:grid-cols-2 gap-3">
        <button className="btn btn-primary flex items-center gap-2 justify-center">
          <FiShare2 />
          分享議程
        </button>
        <button className="btn btn-secondary flex items-center gap-2 justify-center">
          <LuCalendarCheck />
          加入行事曆
        </button>
      </div>
    </section>
  );
};

export default Page;
