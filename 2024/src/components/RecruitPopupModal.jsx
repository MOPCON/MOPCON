"use client";
import { WhiteLogo } from "./ui/Logo";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const RecruitPopupModal = ({ onClose }) => {
  return (
    <motion.div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] flex items-center justify-center w-screen h-screen  bg-black/70"
      onClick={onClose}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <motion.div
        className="flex w-[min(95%,905px)] h-[600px] items-center justify-center rounded-[54px] p-0.5 bg-[linear-gradient(-80deg,_#9CBC43_42%,_#4C766D)]"
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 50,
        }}
        transition={{ type: "spring", stiffness: 50, duration: 0.4 }}
      >
        <div className="w-full h-full bg-gradient-to-b from-[#4D766E] to-[#364758] rounded-[calc(54px-2px)] flex flex-col items-center justify-center relative overflow-hidden">
          <svg
            width="81"
            height="600"
            viewBox="0 0 81 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0 translate-x-8 pointer-events-none opacity-70 tablet:opacity-100"
          >
            <path
              d="M1 0L1 600"
              stroke="url(#paint0_linear_2_18261)"
              strokeWidth="2"
              className="path-line"
              style={{
                "--path-length": 600,
                "--s": "3s",
                "--n-path-length": -600,
                "--d": ".3s",
              }}
            />
            <path
              d="M80 600L80 212.204L25 164.384L25 0"
              stroke="url(#paint1_linear_2_18261)"
              strokeWidth="2"
              className="path-line"
              style={{
                "--path-length": 625,
                "--s": "2.2s",
                "--n-path-length": -625,
                "--d": ".15s",
              }}
            />
            <path
              d="M29 295.693L29 398.152L28.8823 398.275L20.6929 398.275C19.2489 398.229 17.8452 397.788 16.634 397C14.2148 395.202 13.0034 393.063 13 390.582L13 288.123L13.1228 288L21.2508 288C23.247 288 25.1032 288.827 26.8196 290.482C28.2732 292.181 29 293.918 29 295.693Z"
              fill="#E8E3D7"
            />
            <path
              d="M15.1692 419.791C16.8856 421.451 18.7458 422.278 20.75 422.275L28.8789 422.275L29 422.154L29 413.972C29 411.485 27.7873 409.344 25.362 407.548C24.1494 406.76 22.7435 406.319 21.2975 406.275L13.1212 406.275L13.0001 406.396L13.0001 414.577C12.9896 416.356 13.7126 418.094 15.1692 419.791Z"
              fill="#FCEB75"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2_18261"
                x1="1.5"
                y1="0"
                x2="1.5"
                y2="600"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.4" stopColor="#9DBC43" />
                <stop offset="0.905" stopColor="#FCEB75" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2_18261"
                x1="52.5"
                y1="0"
                x2="52.5"
                y2="600"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.4" stopColor="#9DBC43" />
                <stop offset="0.9" stopColor="#FCEB75" />
              </linearGradient>
            </defs>
          </svg>
          <button
            className="absolute -translate-x-8 translate-y-8 top-0 right-0 p-3"
            onClick={onClose}
            aria-label="Close"
          >
            <IoClose className="text-2xl text-white" />
          </button>
          <WhiteLogo className="mb-8 z-10 w-[min(85%,400px)]" />
          <div className="flex items-center flex-col tablet:flex-row justify-between gap-4 tablet:gap-8 text-white z-10">
            <div>2024</div>
            <div className="w-px h-full rounded-full bg-white hidden tablet:inline-block"></div>
            <div>志工招募</div>
            <div className="w-px h-full rounded-full bg-white hidden tablet:inline-block"></div>
            <a className="text-white" href="mailto:service@mopcon.org">
              service@mopcon.org
            </a>
          </div>
          <svg
            width="97"
            height="600"
            viewBox="0 0 97 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 bottom-0 -translate-x-8 pointer-events-none opacity-70 tablet:opacity-100"
          >
            <path
              d="M41 600L41 435.616L1 388.543L1 0"
              stroke="url(#paint0_linear_2_18261)"
              strokeWidth="2"
              className="path-line"
              style={{
                "--path-length": 250,
                "--s": "3.27s",
                "--n-path-length": -250,
                "--d": ".33s",
              }}
            />
            <path
              d="M28 0L28 600"
              stroke="url(#paint1_linear_2_18261)"
              strokeWidth="2"
              className="path-line"
              style={{
                "--path-length": 600,
                "--s": "2.75s",
                "--n-path-length": -600,
                "--d": ".26s",
              }}
            />
            <path
              d="M96 600L96 212.204L56 164.384L56 0"
              stroke="url(#paint2_linear_2_18261)"
              strokeWidth="2"
              className="path-line"
              style={{
                "--path-length": 620,
                "--s": "3.5s",
                "--n-path-length": -620,
                "--d": ".19s",
              }}
            />
            <path
              d="M78.3008 165H70.2651L70 164.73V156.771C70 154.776 70.8362 152.903 72.478 151.173C74.1606 149.733 75.9197 149 77.6941 149H85.7298L86 149.265V157.3C85.9562 158.747 85.5172 160.155 84.7304 161.371C82.9509 163.779 80.7992 165 78.3008 165ZM70.5099 164.491H78.3008C80.6157 164.491 82.6399 163.341 84.3276 161.076C85.0561 159.947 85.4649 158.642 85.5105 157.3V149.519H77.74C76.0931 149.519 74.4512 150.206 72.8655 151.555C71.3359 153.158 70.5354 154.913 70.5354 156.766L70.5099 164.491Z"
              fill="#F79022"
              stroke="#F79022"
            />
            <path
              d="M76.2998 215H68.121L68 215.121V223.3C68.0457 224.744 68.4859 226.148 69.2728 227.36C71.0717 229.787 73.2124 231 75.6949 231H83.879L84 230.879V222.758C84 220.759 83.1707 218.901 81.5122 217.183C79.8185 215.728 78.0811 215 76.2998 215Z"
              fill="#FCEB75"
            />
            <path
              d="M70.4826 241.183C68.831 242.897 68.0035 244.756 68 246.758V254.879L68.121 255H76.3051C78.7877 255 80.9283 253.787 82.7272 251.36C83.5141 250.148 83.9543 248.744 84 247.3V239.121L83.879 239H75.7423C73.947 239 72.1937 239.728 70.4826 241.183Z"
              fill="#9BBC43"
            />
            <path
              d="M68 320.888L68 270.745C68 268.262 69.2195 266.098 71.6243 264.291C72.841 263.495 74.2518 263.049 75.7037 263L83.7553 263L84 263.245L84 313.414C84 315.191 83.27 316.947 81.8229 318.633C80.1052 320.299 78.2287 321.133 76.2405 321.133L68.2447 321.133L68 320.888ZM83.5706 263.465L75.6908 263.465C74.3256 263.512 72.9988 263.93 71.8518 264.674C69.5759 266.365 68.4165 268.417 68.4165 270.753L68.4165 320.703L76.2362 320.703C78.117 320.703 79.8905 319.907 81.5137 318.341C82.8749 316.749 83.5706 315.084 83.5706 313.414L83.5706 263.465Z"
              fill="#47776C"
              stroke="#E9E3D7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2_18261"
                x1="21"
                y1="0"
                x2="21"
                y2="600"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.4" stopColor="#9DBC43" />
                <stop offset="0.905" stopColor="#FCEB75" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2_18261"
                x1="28.5"
                y1="0"
                x2="28.5"
                y2="600"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.4" stopColor="#9DBC43" />
                <stop offset="0.905" stopColor="#FCEB75" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2_18261"
                x1="76"
                y1="0"
                x2="76"
                y2="600"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.4" stopColor="#9DBC43" />
                <stop offset="0.9" stopColor="#FCEB75" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecruitPopupModal;
