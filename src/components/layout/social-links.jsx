import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import React from "react";
import useSiteMetadata from "../../hooks/use-site-metadata";

const SocialLinks = ({ className = "" }) => {
  const { socialLinks } = useSiteMetadata();
  return (
    <div className={cn("grid", "grid-cols-7", "gap-1", className)}>
      {socialLinks &&
        socialLinks.map((link) => (
          <OutboundLink
            href={link.link}
            key={link.name}
            title={link.name}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("mx-2", "text-text", "hover:text-primary")}
          >
            <FontAwesomeIcon icon={link.icon} className={cn("transform", "transition-all", "hover:scale-125")} />
          </OutboundLink>
        ))}
    </div>
  );
};

export default SocialLinks;
