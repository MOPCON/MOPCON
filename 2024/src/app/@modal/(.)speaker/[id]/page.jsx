import Data from "@/components/data/data.json";
import Modal from "./Modal";

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

  if (!speaker) {
    return <h2>找不到講者</h2>;
  }
  return <Modal {...speaker} />;
};

export default Page;
