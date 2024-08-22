import Modal from "./Modal";
import Data from "@/components/data/data.json";

export function generateStaticParams() {
  return Data.speakers.map((speaker) => ({ id: speaker.speakerId.toString() }));
}

export default function SpeakerModal({ params: { id } }) {
  return <Modal>{id}</Modal>;
}
