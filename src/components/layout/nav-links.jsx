import React from "react";
import $ from "classnames";
import { Link } from "gatsby";
import useSiteMetadata from "../../hooks/use-site-metadata";

const NavLinks = ({ footer = false, className, ...props }) => {
  const { navLinks } = useSiteMetadata();

  return (
    <div className={$("grid", "grid-cols-1", "md:grid-cols-3", "gap-0", "md:gap-2", "lg:gap-4", className)}>
      {navLinks &&
        navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.link}
            title={link.name}
            activeClassName="text-primary"
            className={$("text-text", "text-base", "md:border-b-0", { "py-3": !footer }, { "border-b": !footer })}
          >
            {link.name}
          </Link>
        ))}
    </div>
  );
};

export default NavLinks;
