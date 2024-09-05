import { Fragment } from "react";
import Image from "next/image";
import { getImageSrc } from "@/components/util/getImageSrc";
const Leaf = ({ className, fill }) => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 64H32C49.6731 64 64 49.6731 64 32V0H32C14.3269 0 0 14.3269 0 32V64Z"
        fill={fill}
      />
    </svg>
  );
};

const Card = ({ ...props }) => {
  return (
    <Fragment>
      <div className="group rounded-3xl bg-white cursor-pointer h-56 flex flex-col items-center justify-center relative transition-all duration-300 tablet:hover:-translate-y-3 tablet:hover:shadow-[0_10px_30px_0_rgba(0,0,0,0.05)]">
        <div className="flex flex-col rounded-3xl gap-4 bg-white items-center justify-center size-full p-4 overflow-clip relative z-[2]">
          <div className="h-36 w-48 overflow-clip flex items-center justify-center flex-grow">
            <Image
              className="h-full max-w-full object-contain object-center"
              src={getImageSrc(props.img || "/Logo.svg")}
              width={180}
              height={40}
              alt={props.name}
            />
          </div>
          <span className="text-center font-medium text-xl text-[#1C1F25]">
            {props.name}
          </span>
          <Leaf
            className="absolute bottom-0 right-0 translate-y-4 transition-opacity duration-200 opacity-0 tablet:group-hover:opacity-100"
            fill={props.insideColor}
          />
        </div>
        <Leaf
          className="absolute bottom-0 right-0 translate-y-2 translate-x-2 transition-opacity duration-200 opacity-0 tablet:group-hover:opacity-100 -z-10"
          fill={props.outsideColor}
        />
      </div>
    </Fragment>
  );
};

export default Card;
