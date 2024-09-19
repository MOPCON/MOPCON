import { Fragment } from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";

const Card = ({ ...props }) => {
  return (
    <Fragment>
      <div className="flex flex-col rounded-3xl gap-4 bg-white items-center justify-center size-full p-4 overflow-clip relative z-[2] h-56">
        <div className="h-24 w-56 overflow-clip flex items-center justify-center">
          <Image
            className="h-full max-w-full w-full object-contain"
            src={getImageSrc(props.img || "/Logo.svg")}
            width={180}
            height={80}
            alt={props.name}
          />
        </div>
        <span className="text-center font-medium text-xl text-[#1C1F25]">
          {props.name}
        </span>
      </div>
    </Fragment>
  );
};

export default Card;
