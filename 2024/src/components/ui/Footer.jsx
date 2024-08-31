import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-navy-blue py-10">
      <div className="w-[min(90%,1062px)] mx-auto grid grid-cols-1 tablet:grid-cols-2 gap-y-3">
        <div className="text-white flex items-center gap-4">
          <span className="font-bold flex-shrink-0">聯絡我們</span>
          <Link href="mailto:contact@mopcon.org">contact@mopcon.org</Link>
        </div>
        <div className="flex mob:items-center flex-col mob:flex-row gap-4">
          <span className="text-white font-bold flex-shrink-0">
            在這裡找到 #MOPCON
          </span>
          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-md flex items-center justify-center size-6 bg-white/20 text-white text-sm"
              href="https://www.facebook.com/mopcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </Link>
            <Link
              className="rounded-md flex items-center justify-center size-6 bg-white/20 text-white text-sm"
              href="https://x.com/mopcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </Link>
            <Link
              className="rounded-md flex items-center justify-center size-6 bg-white/20 text-white text-sm"
              href="https://t.me/mopcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane />
            </Link>
            <Link
              className="rounded-md flex items-center justify-center size-6 bg-white/20 text-white text-sm"
              href="https://www.instagram.com/mopcon.tw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
