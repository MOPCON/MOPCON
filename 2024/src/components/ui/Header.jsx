"use client";
import React, { Fragment } from "react";
import dynamic from "next/dynamic";
const NavDesktop = dynamic(() => import("../NavDesktop"));
const NavMobile = dynamic(() => import("../NavMobile"));
import useSticky from "../hook/useSticky";

const Header = () => {
  const { sticky } = useSticky();

  return (
    <Fragment>
      <header
        id="header"
        className={`h-[52px] tablet:h-[82px] flex items-center justify-center sticky top-0 left-0 transition-all duration-200 ${
          sticky ? "fixed top-0 left-0 z-50 bg-navy-blue" : "bg-white"
        }`}
      >
        <div className="tablet:flex items-center justify-between w-[min(84%,1204px)] hidden">
          <NavDesktop isSticky={sticky} />
        </div>
        <div className="flex tablet:hidden w-[84%]">
          <NavMobile />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
