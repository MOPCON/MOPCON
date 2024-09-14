import React from "react";
import { GoGlobe } from "react-icons/go";
import { FaLinkedin, FaGithub, FaXTwitter, FaFacebook } from "react-icons/fa6";

const SocialLink = ({ href, Icon, label }) =>
  href && (
    <a
      href={href}
      rel="noreferrer noopener"
      target="_blank"
      className="text-secondary"
    >
      <Icon className="text-xl" aria-label={label} />
    </a>
  );

const SocialLinks = ({
  linkWeb,
  linkLinkedin,
  linkGithub,
  linkTwitter,
  linkFb,
}) => {
  const links = [
    { href: linkWeb, Icon: GoGlobe, label: "Visit website" },
    { href: linkLinkedin, Icon: FaLinkedin, label: "Visit LinkedIn page" },
    { href: linkGithub, Icon: FaGithub, label: "Visit GitHub page" },
    { href: linkTwitter, Icon: FaXTwitter, label: "Visit X page" },
    { href: linkFb, Icon: FaFacebook, label: "Visit Facebook page" },
  ];

  return (
    <div className="flex items-center justify-evenly w-[120px]">
      {links.map((link, index) => (
        <SocialLink key={index} {...link} />
      ))}
    </div>
  );
};

export default SocialLinks;
