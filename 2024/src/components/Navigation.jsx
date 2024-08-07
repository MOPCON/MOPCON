"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { path: "/", label: "首頁" },
  // { path: "/community", label: "主辦社群" },
  // { path: "/", label: "議程介紹" },
  // { path: "/speaker", label: "講者陣容" },
  // { path: "/sponsor", label: "贊助夥伴" },
  // { path: "/ticket", label: "票種介紹" },
  // { path: "/", label: "共筆文件" },
  // { path: "/time-machine", label: "時光機" },
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
const Navigation = ({ toggleShowNav }) => {
  return links.map((link, i) => (
    <motion.div variants={variants} key={i}>
      <Link
        href={link.path}
        className="px-2 py-1 font-medium text-white tablet:text-N800"
        onClick={toggleShowNav}
      >
        {link.label}
      </Link>
    </motion.div>
  ));
};

export default Navigation;
