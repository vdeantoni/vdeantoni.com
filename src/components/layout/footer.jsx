import * as $ from "classnames";
import React from "react";
import NavLinks from "./nav-links.jsx";
import SocialLinks from "./social-links.jsx";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const Footer = () => {
  return (
    <footer>
      <div className={$("flex", "flex-col", "md:flex-row", "items-start", "md:items-center", "justify-center")}>
        <NavLinks footer={true} className={$("gap-4", "my-6", "md:my-0", "md:hidden")} />
        <SocialLinks />
      </div>
      <div
        className={$(
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
        <div className={$("text-sm")}>
          This site is{" "}
          <OutboundLink href="https://github.com/vdeantoni/vdeantoni.com" target="_blank" rel="noopener noreferrer">
            open source.
          </OutboundLink>
        </div>
        <div className={$("text-sm", "self-end")}>© {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
};
export default Footer;
