import { FiMail } from "react-icons/fi";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { FaceBook, Github } from "./Icons";
import { twMerge } from "tailwind-merge";

const socialIcons = {
  email: FiMail,
  threads: FaThreads,
  x: FaXTwitter,
  fb: FaceBook,
  github: Github,
};

const SocialLink = ({ icon: Icon, href, type, className, iconClass }) => {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Link
      href={href}
      className={twMerge(
        `rounded-[50%] size-7 text-white flex items-center justify-center ${
          type === "fb" || type === "github" ? "" : "bg-secondary"
        }`,
        className
      )}
      onClick={handleContentClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className={iconClass} />
    </Link>
  );
};

const SocialLinks = ({ speaker, className, iconClass }) => {
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
              className={className}
              iconClass={iconClass}
            />
          )
      )}
    </>
  );
};

export default SocialLinks;
