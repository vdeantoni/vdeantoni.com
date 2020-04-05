import classnames from "classnames"
import { Link } from "gatsby"
import React from "react"

export const DesktopNav = ({ menuLinks, y, className }) => {
  return (
    <div className={className}>
      {menuLinks.map((link) => (
        <Link
          key={`menu-${link.name}`}
          title={link.name}
          to={link.path}
          className={classnames(
            "ty-link",
            "ml-4",
            { "pb-1": !y },
            "text-sm",
            "font-medium",
            "text-gray-200",
            "hover:border-b-2"
          )}
          activeClassName="text-white opacity-100 border-b-2"
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}
