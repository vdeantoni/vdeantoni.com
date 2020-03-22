import classNames from "classnames"
import { motion, useViewportScroll } from "framer-motion"
import React, { useState } from "react"
import Logo from "../assets/svgs/logo.svg"

const Header = ({ title }) => {
  const { scrollY } = useViewportScroll()
  scrollY.onChange(latest => {
    setSticky(latest > 0)
  })

  const [sticky, setSticky] = useState(false)

  const scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" })
  }

  return (
    <motion.header
      animate={{ opacity: sticky ? 0.95 : 1 }}
      className={classNames("sticky", "top-0", "z-1", "bg-gray-800")}
    >
      <motion.div
        animate={{ maxHeight: sticky ? "3rem" : "4rem" }}
        className="container flex items-center justify-between h-16"
      >
        <div className="flex items-center">
          <a
            href="#top"
            onClick={scrollToTop}
            className="h-8 w-8 mr-4 cursor-pointer"
          >
            <Logo className="h-full w-full" />
          </a>
          <motion.h1
            animate={{
              translateX: sticky ? "-200%" : 0,
              opacity: sticky ? 0 : 1,
            }}
            transition={{ ease: "easeOut" }}
            className="ty-h5 text-white text-shadow"
          >
            {title}
          </motion.h1>
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Header
