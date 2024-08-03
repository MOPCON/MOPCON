import React, { Fragment } from "react";
import Link from "next/link";
import Logo from "./Logo";

const links = [
  { path: "/", label: "首頁" },
  { path: "/community", label: "主辦社群" },
  //   { path: "/", label: "議程介紹" },
  //   { path: "/speaker", label: "講者陣容" },
  //   { path: "/sponsor", label: "贊助夥伴" },
  //   { path: "/ticket", label: "票種介紹" },
  //   { path: "/", label: "共筆文件" },
  //   { path: "/time-machine", label: "時光機" },
];

const Header = () => {
  return (
    <Fragment>
      <header className="bg-white h-[82px] flex items-center justify-center sticky top-0 left-0 z-50">
        <div className="flex items-center justify-between w-[min(84%,1204px)]">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>

          <nav className="flex items-center gap-8">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                className="px-2 py-1 font-medium text-N800"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="w-full h-[2px] absolute bottom-0 left-0 bg-gradient-to-r from-yellow to-light-green"></div>
      </header>
      <div className="h-[50px] flex">
        <svg
          className="mt-auto translate-x-full"
          width="256"
          height="30"
          viewBox="0 0 256 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M241.166 30H49.0543L48.824 29.7793V14.4242C48.9104 11.7167 49.7368 9.08469 51.2136 6.81381C54.5853 2.27766 58.5968 0.00639725 63.2482 0H255.36L255.59 0.230316V15.4702C255.59 19.2131 254.038 22.6935 250.935 25.9117C247.749 28.6372 244.493 30 241.166 30Z"
            fill="#E8E3D7"
          />
          <path
            d="M5.48036 4.06731C2.36954 7.28545 0.81742 10.7734 0.823997 14.5312L0.823998 29.7729L1.05091 30L16.3912 30C21.0542 30 25.0693 27.7262 28.4366 23.1787C29.9149 20.9052 30.7407 18.269 30.824 15.5578L30.824 0.227252L30.5971 0.000209944L15.2567 0.000211285C11.9223 -0.0195316 8.66352 1.33616 5.48036 4.06731Z"
            fill="#FCEB75"
          />
        </svg>
      </div>
    </Fragment>
  );
};

export default Header;
