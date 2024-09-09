"use client";
import SponsorCard from "../_components/SponsorCard";
import SponsorData from "@/components/data/data.json";
import { SponsorLeaf } from "./icons";
import { AnimatePresence } from "framer-motion";
import { useModal } from "@/components/hook/useModal";
import dynamic from "next/dynamic";
import { SectionBlock, SectionTitle } from "@/components/ui/SectionBlock";
const SponsorModal = dynamic(() => import("../_components/Modal"), {
  ssr: false,
});
const AnnualSponsorBlock = ({ title, children, ...props }) => {
  return (
    <div className="mb-10 w-[min(90%,1280px)] mx-auto">
      <h3 className="font-bold tablet:text-[32px] text-xl text-[#1C1F25] mb-6 relative z-[1] tablet:ms-28">
        <SponsorLeaf
          fill={props.fill}
          className="absolute left-0 bottom-0 -translate-x-1/3 translate-y-1/4 -z-10"
        />
        {title}
      </h3>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] gap-6 py-6">
        {children}
      </div>
    </div>
  );
};

const AnnualSponsor = () => {
  const sponsorModal = useModal();

  return (
    <SectionBlock>
      <div className="w-[min(90%,1062px)] mx-auto">
        <SectionTitle arrowTitle="年度贊助商" className="mb-14">
          今年的 <span className="text-light-green">贊助夥伴們</span>
        </SectionTitle>
      </div>
      {SponsorData?.sponsors.map(
        (item, index) =>
          item.companies.length > 0 && (
            <AnnualSponsorBlock key={index} title={item.level} {...item}>
              {item.companies?.map((sponsor, index) => (
                <SponsorCard
                  key={sponsor.id}
                  {...sponsor}
                  onClick={() => sponsorModal.openModal(sponsor)}
                  {...item}
                />
              ))}
            </AnnualSponsorBlock>
          )
      )}
      <AnimatePresence>
        {sponsorModal.content && sponsorModal.isOpen && (
          <SponsorModal
            onClose={() => sponsorModal.closeModal()}
            sponsorData={sponsorModal.content}
          />
        )}
      </AnimatePresence>
    </SectionBlock>
  );
};

export default AnnualSponsor;
