import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
import SocialLinks from "./SocialLinks";
import { motion } from "framer-motion";

const MemberCard = ({ isHovered, onHover, handleClick, ...props }) => {
  return (
    <motion.div
      className="rounded-[20px] cursor-pointer h-[400px] p-[3px] flex flex-col items-center justify-center relative transition-all duration-300 hover:shadow-[0_10px_30px_0_rgba(0,0,0,0.05)] hover:-translate-y-3"
      onClick={handleClick}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      exit={{ opacity: 1 }}
      transition={{ type: "spring" }}
    >
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full p-4 relative z-[1]">
        <div className="overflow-hidden rounded-[50%] border border-white/60">
          <Image
            className="h-full object-contain"
            src={getImageSrc(props.img || "/img/swiper-default.webp")}
            width={120}
            height={120}
            alt={props.name}
          />
        </div>
        <h5 className="text-center font-bold text-N800 text-xl">
          {props.name}
        </h5>
        <span className="text-center text-N800 mb-6 block">
          {props.company}
          {props.jobTitle && <span>/{props.jobTitle}</span>}
        </span>
        <div className="flex flex-wrap gap-3 items-center">
          <SocialLinks speaker={props} />
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;
