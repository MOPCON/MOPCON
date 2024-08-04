import React, { Fragment } from "react";
import Link from "next/link";
import { Logo } from "./ui/Logo";
import Navigation from "./Navigation";

const NavDesktop = () => {
  return (
    <Fragment>
      <Link href="/" aria-label="Home">
        <Logo />
      </Link>
      <nav className="flex items-center gap-8">
        <Navigation />
      </nav>
    </Fragment>
  );
};

export default NavDesktop;
