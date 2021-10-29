import cn from "classnames";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import React from "react";
import NavLinks from "./nav-links.jsx";
import SocialLinks from "./social-links.jsx";

const Footer = () => {
  return (
    <footer>
      <div className={cn("flex", "flex-col", "md:flex-row", "items-start", "md:items-center", "justify-center")}>
        <NavLinks footer={true} className={cn("gap-4", "my-6", "md:my-0", "md:hidden")} />
        <SocialLinks />
      </div>
      <div
        className={cn(
          "border-t",
          "text-sm",
          "flex",
          "justify-between",
          "py-4",
          "md:py-5",
          "md:py-6",
          "mt-4",
          "md:mt-5",
          "md:mt-6"
        )}
      >
        <div className={cn("text-sm")}>
          This web site is{" "}
          <OutboundLink href="https://github.com/vdeantoni/vdeantoni.com" target="_blank" rel="noopener noreferrer">
            open source.
          </OutboundLink>
        </div>
        <div className={cn("text-sm", "self-end")}>© {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
};
export default Footer;
