import { useToast } from "@/components/hooks/use-toast";
import { BasicModal, ModalBody, CloseButton } from "@/components/ui/BasicModal";
import { FaFacebook, FaLine, FaCopy } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { FiCalendar } from "react-icons/fi";
import { GreenLeaf } from "@/components/ui/ModalLeaf";
import { FiShare2 } from "react-icons/fi";
import { useJsonParse } from "@/components/hooks/useJsonParse";
import GoogleCalendarButton from "@/components/GoogleCalendarButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
} from "react-share";
import { convertTimestampIntl } from "@/components/util/convertTimestampIntl";

import SpeakerInformation from "../_ui/SpeakerInformation";

const SpeakerModal = ({ onClose, ...props }) => {
  const { toast } = useToast();
  const url = `https://mopcon.org/2024/speaker/?id=${props.sessionId}`;
  const dateTime = convertTimestampIntl(props.startedAt, {
    month: "long",
    day: "numeric",
  });
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "已成功複製網址",
        description: props.topic,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "複製成功",
        description: "複製當前網址失敗",
        variant: "destructive",
      });
    }
  };

  return (
    <BasicModal
      onClose={onClose}
      className="w-[min(95%,800px)] rounded-3xl mob:rounded-[54px] h-auto"
    >
      <ModalBody
        className={
          "rounded-[calc(24px-3px)] mob:rounded-[calc(54px-3px)] pt-10 px-8 mob:px-14 tablet:px-20 pb-[60px]"
        }
      >
        <CloseButton onClose={onClose} iconClass={"text-xl text-secondary"} />
        <div className="max-h-[calc(100dvh-200px)] overflow-y-auto pb-4 px-3">
          <SpeakerInformation key={props.id} {...props} />
          {props.coSpeaker &&
            props.coSpeaker.map((item) => (
              <SpeakerInformation key={item.id} {...item} />
            ))}
          <article className="flex flex-col gap-10 mb-10">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-N800/80 font-medium leading-6">議程主題</h3>
                <GreenLeaf />
              </div>
              <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 mb-4">
                <h3 className="font-bold text-N800 text-lg row-start-3 tablet:row-start-1">
                  {props.topic}
                </h3>
                <div className="flex items-center tablet:justify-end gap-6">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-secondary" />
                    <time className="text-N800/80" dateTime={dateTime}>
                      {dateTime}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <GrLocation className="text-secondary" />
                    <span className="text-N800/80">R{props.room}</span>
                  </div>
                </div>
              </div>
              <div className="text-N800/80 leading-6 mb-4 flex flex-col gap-2">
                {useJsonParse(props.summary)}
              </div>
              <div className="flex items-center justify-center mob:justify-normal gap-3 flex-wrap">
                {props.tags.map((item) => (
                  <span
                    key={item.id}
                    className="rounded-full px-3 py-1 text-white bg-secondary"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </section>
            {props.target && (
              <section>
                <h3 className="text-N800/80 font-medium leading-6 mb-4">
                  目標會眾
                </h3>
                <div className="text-N800/80 leading-6">
                  {useJsonParse(props.target)}
                </div>
              </section>
            )}
            {props.priorKnowledge && (
              <section>
                <h3 className="text-N800/80 font-medium leading-6 mb-4">
                  先備知識
                </h3>
                <div className="text-N800/80 leading-6">
                  {useJsonParse(props.priorKnowledge)}
                </div>
              </section>
            )}
            {props.expectedGain && (
              <section>
                <h3 className="text-N800/80 font-medium leading-6 mb-4">
                  會眾預期收穫
                </h3>
                <div className="text-N800/80 leading-6">
                  {useJsonParse(props.expectedGain)}
                </div>
              </section>
            )}
          </article>
          <div className="grid grid-cols-1 mob:grid-cols-2 gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="btn btn-primary flex items-center gap-2 justify-center">
                <FiShare2 />
                分享議程
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[70]">
                <DropdownMenuItem className="p-0">
                  <button
                    className="w-full hover:bg-slate-100 p-2 rounded flex items-center gap-1 text-N800"
                    onClick={handleCopyUrl}
                    aria-label="Copy URL"
                  >
                    <FaCopy />
                    複製連結
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <FacebookShareButton
                    url={url}
                    title={`${props.topic} | MOPCON 2024`}
                    hashtag={`#MOPCON2024 #${props.topic} #${props.name}`}
                    quote={`${props.topic} | MOPCON 2024`}
                    className="w-full !block"
                  >
                    <div className="w-full hover:bg-slate-100 p-2 rounded flex items-center gap-1 text-N800">
                      <FaFacebook />
                      分享至 Facebook
                    </div>
                  </FacebookShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <LineShareButton className="w-full !block" url={url}>
                    <div className="w-full hover:bg-slate-100 p-2 rounded flex items-center gap-1 text-N800">
                      <FaLine />
                      分享至 Line
                    </div>
                  </LineShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <TwitterShareButton
                    url={url}
                    title={`${props.topic} | MOPCON 2024`}
                    hashtags={["MOPCON2024", props.name]}
                    className="w-full !block"
                  >
                    <div className="w-full hover:bg-slate-100 p-2 rounded flex items-center gap-1 text-N800">
                      <FaXTwitter />
                      分享至 X
                    </div>
                  </TwitterShareButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <GoogleCalendarButton event={props} />
          </div>
        </div>
      </ModalBody>
    </BasicModal>
  );
};

export default SpeakerModal;
