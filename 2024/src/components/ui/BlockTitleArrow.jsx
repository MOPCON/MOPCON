import { twMerge } from "tailwind-merge";

const BlockTitleArrow = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "flex items-center gap-3 text-sm tablet:text-base text-[#AEBECF] mb-5",
        className
      )}
    >
      {children}
      <svg
        width="62"
        height="18"
        viewBox="0 0 62 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 9H60M60 9L55.4813 5M60 9L55.4813 13"
          stroke="#AEBECF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default BlockTitleArrow;
