import { Link } from "gatsby";
import React from "react";

export const DesktopNav = ({ menuLinks, className }) => {
  return (
    <div className={className}>
      {menuLinks.map((link) => (
        <Link
          key={`menu-${link.name}`}
          title={link.name}
          to={link.path}
          className="ml-4 pb-1 text-sm font-medium hover:border-b-2"
          activeClassName="opacity-100 border-b-2"
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}
