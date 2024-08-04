"use client";
import { WhiteLogo } from "./ui/Logo";
import { IoClose } from "react-icons/io5";
import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RecruitPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  function openPopup() {
    setShowPopup(!showPopup);
    if (!showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  return (
    <Fragment>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] flex items-center justify-center w-screen h-screen  bg-black/70"
            onClick={openPopup}
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
                  className="absolute left-0 top-0 translate-x-8 pointer-events-none"
                >
                  <path
                    d="M1 0L1 600"
                    stroke="url(#paint0_linear_2_18261)"
                    strokeWidth="2"
                    // className="path-line"
                    style={{
                      "--path-length": 600,
                      "--s": "3s",
                      "--n-path-length": -600,
                    }}
                  />
                  <path
                    d="M80 600L80 212.204L25 164.384L25 0"
                    stroke="url(#paint1_linear_2_18261)"
                    strokeWidth="2"
                    // className="path-line"
                    style={{
                      "--path-length": 625,
                      "--s": "1.7s",
                      "--n-path-length": -625,
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
                  onClick={openPopup}
                  aria-label="Close"
                >
                  <IoClose className="text-2xl text-white" />
                </button>
                <WhiteLogo className="mb-8 z-10" />
                <div className="flex items-center justify-between gap-8 text-white z-10">
                  <div>2024</div>
                  <div className="w-px h-full rounded-full bg-white"></div>
                  <div>志工招募</div>
                  <div className="w-px h-full rounded-full bg-white"></div>
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
                  className="absolute right-0 bottom-0 -translate-x-8 pointer-events-none"
                >
                  <path
                    d="M41 600L41 435.616L1 388.543L1 0"
                    stroke="url(#paint0_linear_2_18261)"
                    strokeWidth="2"
                    // className="path-line"
                    style={{
                      "--path-length": 250,
                      "--s": "2.3s",
                      "--n-path-length": -250,
                    }}
                  />
                  <path
                    d="M28 0L28 600"
                    stroke="url(#paint1_linear_2_18261)"
                    strokeWidth="2"
                    // className="path-line"
                    style={{
                      "--path-length": 600,
                      "--s": "2.3s",
                      "--n-path-length": -600,
                    }}
                  />
                  <path
                    d="M96 600L96 212.204L56 164.384L56 0"
                    stroke="url(#paint2_linear_2_18261)"
                    strokeWidth="2"
                    // className="path-line"
                    style={{
                      "--path-length": 620,
                      "--s": "2.5s",
                      "--n-path-length": -620,
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
        )}
      </AnimatePresence>
      <button
        className="fixed bottom-5 right-5 w-[82px] h-[82px] rounded-[50%] flex items-center justify-center bg-navy-blue z-10"
        onClick={openPopup}
        aria-label="Open Popup"
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7174 18.0452C12.3854 14.8973 15.3114 8.78332 19.8707 5.64528C25.3939 1.84517 30.3772 0.784067 34.4544 0.784067C38.3747 0.784067 39.4724 1.25451 39.786 1.41132L38.8704 3.57942L37.8202 4.75543C37.8202 4.75543 28.7107 1.4874 19.3696 7.34628C11.3629 12.3708 10.1706 20.7963 12.3854 26.8789C11.5628 24.6197 11.1303 20.8118 11.7174 18.0452ZM19.4932 4.70404C14.801 7.93277 11.7336 12.6701 10.8564 18.0452C10.1582 22.32 11.0201 26.5433 13.1577 29.3428C14.4952 31.0962 15.0358 32.0304 17.717 33.8564C20.979 36.0754 23.7911 36.5375 23.7911 36.5375C23.7911 36.5375 18.9299 34.8126 16.1072 28.3832C14.0686 21.4834 16.8913 14.4268 23.7911 11.4474C25.4468 10.8246 27.012 10.5065 28.6523 10.5065C31.4015 10.5065 33.3979 11.3404 34.4544 11.9178C34.9424 12.199 35.5521 12.5451 35.5521 12.5451L35.7969 12.0231L40.7269 0.807183L40.4149 0.713466C40.3253 0.683234 38.0457 0 34.5427 0C30.7927 0 25.1368 0.816253 19.4932 4.70404Z"
            fill="#E6E3D7"
          />
          <path
            d="M30.7192 45.3826C27.7537 46.6324 21.064 47.7228 15.8839 45.7728C9.61001 43.4099 5.89261 39.9255 3.5638 36.5789C1.32457 33.361 1.08373 32.1913 1.03331 31.8443L3.33591 31.3575L4.90109 31.5478C4.90109 31.5478 7.4218 40.8917 17.5664 45.2126C26.2639 48.9147 33.8608 45.0809 37.5885 39.7886C36.2039 41.7543 33.3254 44.2842 30.7192 45.3826ZM15.327 46.6204C20.6573 48.6276 26.2978 48.4395 31.211 46.0894C35.1185 44.2207 38.0929 41.101 39.1698 37.7474C39.8451 35.648 40.3031 34.6707 40.2704 31.4269C40.2286 27.4819 39.0017 24.9098 39.0017 24.9098C39.0017 24.9098 40.3625 29.8852 36.6974 35.8744C32.1983 41.4888 24.7938 43.2025 18.4072 39.2409C16.9503 38.2375 15.7951 37.1345 14.8582 35.7881C13.2879 33.5315 12.8321 31.4164 12.7026 30.2195C12.6546 29.6583 12.5905 28.9602 12.5905 28.9602L12.0222 29.0574L0 31.4171L0.101276 31.7267C0.127629 31.8175 0.868934 34.079 2.86975 36.9542C5.01171 40.0323 8.9123 44.2086 15.327 46.6204Z"
            fill="#E6E3D7"
          />
          <path
            d="M37.5882 14.3008C40.582 15.481 46.1269 19.3791 48.4665 24.3952C51.2994 30.4715 51.5205 35.5618 50.8453 39.5826C50.196 43.4488 49.5502 44.4534 49.3437 44.7367L47.3571 43.4747L46.3713 42.2442C46.3713 42.2442 51.1029 33.8018 46.872 23.6193C43.243 14.8911 35.1313 12.3198 28.7658 13.4966C31.1301 13.0595 34.957 13.2637 37.5882 14.3008ZM49.4573 24.1788C47.0503 19.0167 42.8864 15.2071 37.7308 13.4517C33.6307 12.0552 29.3229 12.2057 26.2081 13.8501C24.2574 14.8788 23.2466 15.2572 21.0017 17.5989C18.2731 20.4484 17.3516 23.1451 17.3516 23.1451C17.3516 23.1451 19.8579 18.6367 26.6659 16.9179C33.808 16.0502 40.2997 20.0025 42.0953 27.3005C42.4352 29.0365 42.4897 30.6328 42.218 32.2504C41.7627 34.9616 40.6097 36.7924 39.8653 37.7386C39.5072 38.1734 39.0649 38.7173 39.0649 38.7173L39.5391 39.0452L49.7836 45.7647L49.9277 45.4725C49.9724 45.3892 51.0237 43.2541 51.6039 39.7996C52.2249 36.1013 52.3567 30.3883 49.4573 24.1788Z"
            fill="#E6E3D7"
          />
          <path
            d="M28.6566 24.1022C26.3693 24.1022 24.3379 23.4404 23.1678 22.4399C21.6856 23.8826 20.7837 25.8961 20.7837 28.126C20.7837 30.726 21.3829 33.0342 23.9853 34.4769V29.6753C23.9853 28.794 25.1024 28.0915 25.9793 28.0915C26.8561 28.0915 28.0075 28.7971 28.0075 29.6753V35.8914C28.0075 35.9886 28.3789 36.0388 28.9031 36.0388C29.4055 36.0388 29.7425 35.9917 29.7425 35.9008V29.6753C29.7425 28.794 30.6037 28.0852 31.4806 28.0852C32.3543 28.0852 33.5307 28.794 33.5307 29.6753V34.5208C35.2657 33.0813 36.6324 30.751 36.6324 28.126C36.6324 25.8961 35.6432 23.8826 34.1641 22.4399C32.994 23.4404 30.947 24.1022 28.6566 24.1022Z"
            fill="#E6E3D7"
          />
          <path
            d="M41.7434 7.47643C41.0605 8.18293 40.7198 8.94868 40.7212 9.77366V13.1198L40.771 13.1697H44.1388C45.1625 13.1697 46.044 12.6705 46.7832 11.6721C47.1078 11.173 47.2891 10.5942 47.3074 9.99905V6.63339L47.2575 6.58354H43.8897C43.1577 6.57921 42.4423 6.87684 41.7434 7.47643Z"
            fill="#9BBC43"
          />
        </svg>
      </button>
    </Fragment>
  );
};

export default RecruitPopup;
