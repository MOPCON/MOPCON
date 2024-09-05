import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-navy-blue py-10">
      <div className="w-[min(90%,1062px)] mx-auto">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-y-3 mb-8">
          <div className="text-white flex flex-col tablet:flex-row items-center gap-1 tablet:gap-4">
            <span className="font-bold flex-shrink-0">聯絡我們</span>
            <Link href="mailto:contact@mopcon.org">contact@mopcon.org</Link>
          </div>
          <div className="flex items-center flex-col tablet:flex-row gap-3 tablet:gap-4">
            <span className="text-white font-bold flex-shrink-0">
              在這裡找到 #MOPCON
            </span>
            <div className="flex flex-wrap gap-3">
              <Link
                className="rounded-md flex items-center justify-center size-6 bg-white/20 text-white text-sm"
                href="https://www.facebook.com/mopcon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </Link>
              <Link
                className="rounded-md flex items-center justify-center size-6 bg-white/20 text-white text-sm"
                href="https://x.com/mopcon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <FaXTwitter />
              </Link>
              <Link
                className="rounded-md flex items-center justify-center size-6 bg-white/20 text-white text-sm"
                href="https://t.me/mopcon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <FaTelegramPlane />
              </Link>
              <Link
                className="rounded-md flex items-center justify-center size-6 bg-white/20 text-white text-sm"
                href="https://www.instagram.com/mopcon.tw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-sm text-center tablet:text-start text-white/40">
          Designed by MOPCON. Icons by{" "}
          <Link
            href="https://icons8.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            icons8.com
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
