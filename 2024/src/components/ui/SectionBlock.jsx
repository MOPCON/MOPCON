import BlockTitleArrow from "./BlockTitleArrow";
import { twMerge } from "tailwind-merge";
import { Fragment } from "react";

export const SectionTitle = ({ children, ...props }) => {
  return (
    <Fragment>
      <BlockTitleArrow>{props.arrowTitle}</BlockTitleArrow>
      <h2
        className={twMerge("block-title text-[#161C2D] mb-3", props.className)}
      >
        {children}
      </h2>
    </Fragment>
  );
};

export const SectionSubTitle = ({ children, ...props }) => {
  return <h3 className="text-secondary text-lg tablet:text-2xl">{children}</h3>;
};

export const SectionBlock = ({ children, ...props }) => {
  return (
    <section
      className={twMerge(
        "w-full py-12 tablet:py-18 laptop:py-24 relative overflow-clip",
        props.className
      )}
    >
      {children}
    </section>
  );
};
