import classNames from "classnames"
import { motion, useViewportScroll } from "framer-motion"
import React, { useEffect, useState } from "react"
import Logo from "../assets/svgs/logo.svg"
import { DesktopNav } from "./nav/desktop-nav"
import { MobileNav } from "./nav/mobile-nav"
import { MobileNavToggle } from "./nav/mobile-nav-toggle"

const Header = ({ title, siteUrl, contactLinks, menuLinks }) => {
  const [open, setOpen] = useState(false)

  const { scrollY } = useViewportScroll()
  const [y, setY] = useState(0)

  useEffect(() => {
    scrollY.onChange((latest) => {
      setY(latest)
    })
    return () => {
      scrollY.destroy()
    }
  })

  return (
    <motion.header
      animate={{ opacity: y ? 0.95 : 1 }}
      className={classNames("sticky", "top-0", "z-1", "bg-gray-800")}
    >
      <motion.div
        animate={{ maxHeight: y > 0 ? "2rem" : "4rem" }}
        initial={false}
        className="container flex items-center justify-between h-16"
      >
        <div className="flex-1 flex items-center">
          <motion.a
            animate={{ scale: y ? 0.75 : 1 }}
            href={siteUrl}
            className="h-8 w-8 mr-4"
          >
            <Logo className="h-full w-full" />
          </motion.a>
          <div className="relative flex-1 flex items-center">
            <motion.h1
              animate={{
                translateX: y ? "-200%" : 0,
                opacity: y ? 0 : 1,
              }}
              transition={{ ease: "easeOut" }}
              className="hidden sm:block ty-h5 text-white text-shadow"
            >
              {title}
            </motion.h1>
          </div>

          <DesktopNav
            menuLinks={menuLinks}
            y={y}
            className="hidden md:block"
          ></DesktopNav>
          <MobileNavToggle
            open={open}
            setOpen={setOpen}
            className="md:hidden"
          ></MobileNavToggle>
        </div>
      </motion.div>
      <MobileNav
        menuLinks={menuLinks}
        open={open}
        className={`${open ? "" : "hidden"} md:hidden`}
      ></MobileNav>
    </motion.header>
  )
}

export default Header
