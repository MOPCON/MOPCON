import { FiMail } from "react-icons/fi";
import { FaThreads, FaXTwitter, FaFacebook } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io5";
import Link from "next/link";
import { FaceBook, Github } from "./Icons";

const socialIcons = {
  email: FiMail,
  threads: FaThreads,
  x: FaXTwitter,
  fb: FaceBook,
  github: Github,
};

const SocialLink = ({ icon: Icon, href, type }) => {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Link
      href={href}
      className={`rounded-[50%] w-7 h-7 text-white flex items-center justify-center ${
        type === "fb" || type === "github" ? "" : "bg-secondary"
      }`}
      onClick={handleContentClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon />
    </Link>
  );
};

const SocialLinks = ({ speaker }) => {
  const socialLinks = [
    { type: "email", url: `mailto:${speaker.email}` },
    { type: "threads", url: speaker.threads },
    { type: "x", url: speaker.x },
    { type: "fb", url: speaker.fb },
    { type: "github", url: speaker.github },
  ];

  return (
    <>
      {socialLinks.map(
        ({ type, url }) =>
          url && (
            <SocialLink
              key={type}
              icon={socialIcons[type]}
              href={url}
              type={type}
            />
          )
      )}
    </>
  );
};

export default SocialLinks;
