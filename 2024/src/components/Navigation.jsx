"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { path: "/", label: "首頁" },
  { path: "/community", label: "主辦單位" },
  { path: "/schedule", label: "議程介紹" },
  { path: "/speaker", label: "講者陣容" },
  { path: "/agenda-member", label: "議程委員" },
  { path: "/sponsor", label: "贊助夥伴" },
  { path: "/ticket", label: "票種介紹" },
  { path: "https://hackmd.io/@mopcon/rylQQG9N6A/", label: "共筆文件" },
  { path: "/time-machine", label: "時光機" },
];

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
const Navigation = ({ toggleShowNav, isSticky }) => {
  return links.map((link, i) => (
    <motion.div variants={variants} key={i}>
      <Link
        href={link.path}
        className={`px-2 py-1 font-medium text-white ${
          isSticky ? "text-white" : "laptop:text-N800"
        }`}
        onClick={toggleShowNav}
      >
        {link.label}
      </Link>
    </motion.div>
  ));
};

export default Navigation;
