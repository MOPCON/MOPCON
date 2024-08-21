"use client";
import Navigation from "./Navigation";
import Link from "next/link";
import { MobileLogo } from "./ui/Logo";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { motion } from "framer-motion";

const variantsContainer = {
  open: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const NavMobile = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      <Link href="/" aria-label="Home">
        <MobileLogo />
      </Link>
      <button
        className="ms-auto px-2"
        onClick={toggleNav}
        aria-label="Menu-Open"
      >
        <LuMenu className="text-2xl" />
      </button>
      <motion.div
        className={`fixed top-0 duration-300 h-dvh w-screen bg-[linear-gradient(152deg,_#4D766E_42%,_#364758)] z-50 right-0 flex flex-col justify-center items-center ${
          showNav ? "translate-x-0" : "translate-x-full"
        }`}
        animate={showNav ? "open" : "closed"}
      >
        <button
          className="absolute top-5 right-5 p-4"
          onClick={toggleNav}
          aria-label="Menu-Close"
        >
          <IoClose className="text-2xl text-white" />
        </button>
        <motion.div
          className="flex flex-col justify-center items-center gap-8"
          variants={variantsContainer}
        >
          <Navigation toggleShowNav={toggleNav} />
        </motion.div>
      </motion.div>
    </>
  );
};

export default NavMobile;
