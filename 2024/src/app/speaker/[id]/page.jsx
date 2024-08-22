import React from "react";
import Data from "@/components/data/data.json";

export const generateStaticParams = async () =>
  Data.speakers.map((speaker) => ({ id: speaker.speakerId.toString() }));
const Page = ({ params: { id } }) => {
  const speakerId = parseInt(id, 10);
  const speaker = Data.speakers.find((s) => s.speakerId === speakerId);

  if (!speaker) {
    return <div>Speaker not found</div>;
  }

  return (
    <div>
      <h1>{speaker.company}</h1>
    </div>
  );
};

export default Page;
