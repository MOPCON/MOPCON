import React, { Fragment } from "react";
import ModalImage from "@/components/ModalImage";
import { OrangeLeaf } from "@/components/ui/ModalLeaf";
import { useJsonParse } from "@/components/hooks/useJsonParse";
import SocialLinks from "../_components/SocialLink";
const SpeakerInformation = ({ ...props }) => {
  return (
    <Fragment>
      <div className="flex flex-col items-center mob:block mb-10">
        <div className="flex gap-3 flex-col mob:flex-row items-center w-fit mb-3">
          <div className="size-[120px] rounded-[50%] overflow-clip flex items-center justify-center">
            <ModalImage src={props.img} alt={props.name} />
          </div>
          <div>
            <h4 className="font-bold text-[#343844] mb-2">{props.name}</h4>
            <div className="flex flex-col items-center mob:items-start">
              <span className="text-N800 font-medium">{props.company}</span>
              <span className="text-N800 font-medium">{props.jobTitle}</span>
            </div>
          </div>
        </div>
        <SocialLinks
          linkWeb={props.linkWeb}
          linkLinkedin={props.linkLinkedin}
          linkGithub={props.linkGithub}
          linkTwitter={props.linkTwitter}
          linkFb={props.linkFb}
        />
      </div>
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-N800/80 font-medium leading-6">介紹</h3>
          <OrangeLeaf />
        </div>
        <div className="text-N800/80 leading-6 flex flex-col gap-2">
          {useJsonParse(props.bio)}
        </div>
      </section>
    </Fragment>
  );
};

export default SpeakerInformation;
