import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as $ from "classnames";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import React from "react";
import useSiteMetadata from "../../hooks/use-site-metadata";

const SocialLinks = ({ className = "" }) => {
  const { socialLinks } = useSiteMetadata();
  return (
    <div className={$("grid", "grid-cols-7", "gap-1", className)}>
      {socialLinks &&
        socialLinks.map((link) => (
          <OutboundLink
            href={link.link}
            key={link.name}
            title={link.name}
            target="_blank"
            rel="noopener noreferrer"
            className={$("mx-2", "text-text", "hover:text-primary")}
          >
            <FontAwesomeIcon
              icon={link.icon}
              className={$("transform", "transition-all", "hover:scale-110")}
            />
          </OutboundLink>
        ))}
    </div>
  );
};

export default SocialLinks;
