import * as $ from "classnames";
import React from "react";
import NavLinks from "./nav-links.jsx";
import SocialLinks from "./social-links.jsx";

const Footer = () => {
  return (
    <footer>
      <div className={$("flex", "flex-col", "md:flex-row", "items-start", "md:items-center", "justify-center")}>
        <NavLinks footer={true} className={$("gap-4", "my-6", "md:my-0", "md:hidden")} />
        <SocialLinks />
      </div>
      <div className={$("border-t", "text-center", "py-4", "md:py-5", "md:py-6", "mt-4", "md:mt-5", "md:mt-6")}>
        <p className={$("text-sm")}>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
export default Footer;
