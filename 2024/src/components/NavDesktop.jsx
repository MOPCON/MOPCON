import React, { Fragment } from "react";
import Link from "next/link";
import { Logo } from "./ui/Logo";
import Navigation from "./Navigation";

const NavDesktop = ({ isSticky }) => {
  return (
    <Fragment>
      <Link href="/" aria-label="Home">
        <Logo className={isSticky ? "stroke-white" : "stroke-[#0E2219]"} />
      </Link>
      <nav className="flex items-center laptop:gap-4 desktop:gap-8">
        <Navigation isSticky={isSticky} />
      </nav>
    </Fragment>
  );
};

export default NavDesktop;
