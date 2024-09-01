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
        className={`h-[52px] tablet:h-[72px] w-full flex items-center justify-center z-50 top-0 left-0 transition-all duration-200 ${
          sticky ? "fixed top-0 left-0 bg-navy-blue" : "bg-white relative"
        }`}
      >
        <div className="tablet:flex items-center justify-between w-[min(84%,1204px)] hidden">
          <NavDesktop isSticky={sticky} />
        </div>
        <div className="flex tablet:hidden w-[84%]">
          <NavMobile isSticky={sticky} />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
