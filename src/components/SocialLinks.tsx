import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faMedium } from "@fortawesome/free-brands-svg-icons/faMedium";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons/faStackOverflow";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import React, { FC } from "react";

const SocialLinks = ({ className = "" }: { className?: string }) => {
  const socialLinks = [
    {
      name: "Email",
      link: "mailto:admin@vdeantoni.com",
      icon: faEnvelope,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/vdeantoni",
      icon: faLinkedin,
    },
    {
      name: "Medium",
      link: "https://medium.com/@vdeantoni",
      icon: faMedium,
    },
    {
      name: "Stack Overflow",
      link: "https://stackoverflow.com/users/621767/deantoni?tab=profile",
      icon: faStackOverflow,
    },
    {
      name: "Github",
      link: "https://github.com/vdeantoni",
      icon: faGithub,
    },
    {
      name: "Twitter",
      link: "https://twitter.com/vinideantoni",
      icon: faTwitter,
    },
  ];

  return (
    <div className={cn("flex", className)}>
      {socialLinks?.map((link) => (
        <a
          href={link.link}
          key={link.name}
          title={link.name}
          className={cn("mx-2", "text-text", "hover:text-primary")}
        >
          <FontAwesomeIcon
            icon={link.icon}
            className={cn(
              "w-5",
              "h-5",
              "transform",
              "transition-all",
              "hover:scale-125",
            )}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
