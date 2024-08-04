import { FooterSvg, MobileFooterSvg } from "./FooterSvg";
import { BsFacebook, BsTwitterX, BsTelegram } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="my-10 pt-8">
      <FooterSvg className={"hidden mob:block w-full"} />
      <MobileFooterSvg className={"block mob:hidden w-full"} />
      <div className="w-[min(84%,1204px)] mx-auto grid grid-cols-2 mt-14 mb-4">
        <div>
          <h5 className="mb-4 text-black font-bold">聯絡我們</h5>
          <a href="mailto:contact@mopcon.org">contact@mopcon.org</a>
        </div>
        <div>
          <h5 className="mb-4 text-black font-bold">在這裡找到 #MOPCON</h5>
          <a
            href="https://www.facebook.com/mopcon"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-N800 flex items-center gap-1"
          >
            <BsFacebook className="text-neutral-700" />
            Facebook
          </a>
          <a
            href="https://www.instagram.com/mopcon.tw"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-N800 flex items-center gap-1 mt-2"
          >
            <RiInstagramFill className="text-neutral-700" />
            Instagram
          </a>
          <a
            href="https://x.com/mopcon"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-N800 flex items-center gap-1 mt-2"
          >
            <BsTwitterX className="text-neutral-700" />
            Twitter / X
          </a>
          <a
            href="https://t.me/mopcon"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-N800 flex items-center gap-1 mt-2"
          >
            <BsTelegram className="text-neutral-700" />
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
