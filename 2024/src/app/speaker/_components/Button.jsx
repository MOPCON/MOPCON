"use client";
import { FaCircleCheck } from "react-icons/fa6";

const Button = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className={`rounded-full text-white py-2 px-4 flex items-center gap-2 hover:bg-light-green transition-colors duration-150 ${
        props.isSelected ? "bg-light-green" : "bg-secondary"
      }`}
      onClick={props.onClick}
      aria-label={props.name}
    >
      {props.isSelected && <FaCircleCheck className="text-secondary/60" />}
      {children}
    </button>
  );
};

export default Button;
