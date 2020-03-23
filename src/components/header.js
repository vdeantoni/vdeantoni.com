import classNames from "classnames"
import { motion, useViewportScroll } from "framer-motion"
import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Logo from "../assets/svgs/logo.svg"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const Header = ({ title, contactLinks }) => {
  const { scrollY } = useViewportScroll()
  const [y, setY] = useState(0)

  useEffect(() => {
    scrollY.onChange(latest => {
      setY(latest)
    })
    return () => {
      scrollY.destroy()
    }
  })

  const scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" })
  }

  return (
    <motion.header
      animate={{ opacity: y ? 0.95 : 1 }}
      className={classNames("sticky", "top-0", "z-1", "bg-gray-800")}
    >
      <motion.div
        animate={{ maxHeight: y ? "2rem" : "4rem" }}
        className="container flex items-center justify-between h-16"
      >
        <div className="flex-1 flex items-center">
          <motion.a
            animate={{ scale: y ? 0.75 : 1 }}
            href="javascript:void(0)"
            onClick={scrollToTop}
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
          <motion.div
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hide"
            animate={y ? "show" : ""}
          >
            {contactLinks.map(link => (
              <motion.span
                key={link.name}
                variants={{
                  hide: { opacity: 0 },
                  show: { opacity: 1 },
                }}
              >
                <OutboundLink
                  title={link.name}
                  href={link.link}
                  className="ty-link text-white mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={link.icon} />
                </OutboundLink>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Header
