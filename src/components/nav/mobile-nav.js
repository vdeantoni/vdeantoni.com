import classnames from "classnames"
import { motion } from "framer-motion"
import { Link } from "gatsby"
import React from "react"

export const MobileNav = ({ menuLinks, open, className }) => {
  return (
    <motion.ul
      animate={open ? "open" : "closed"}
      variants={{
        open: {
          transition: { staggerChildren: 0.07 },
        },
        closed: {
          transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
      }}
      className={classnames(
        "container",
        "flex",
        "flex-col",
        "px-10",
        "pb-2",
        "text-right",
        className
      )}
    >
      {menuLinks.map((link) => (
        <motion.li
          variants={{
            open: { translateX: "0px" },
            closed: { translateX: "-10px" },
          }}
          key={`menu-${link.name}`}
          className="py-2"
        >
          <Link
            title={link.name}
            to={link.path}
            className={classnames(
              "text-sm",
              "font-medium",
            )}
            activeClassName="opacity-100"
          >
            {link.name}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  )
}
