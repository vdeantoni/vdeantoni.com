import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "classnames";
import { Link } from "gatsby";
import React, { useState } from "react";
import useColorScheme from "../../hooks/use-color-scheme.js";
import useSiteMetadata from "../../hooks/use-site-metadata.js";
import Logo from "../../images/logo.svg";
import NavLinks from "./nav-links.jsx";
import SocialLinks from "./social-links.jsx";
import { motion, useAnimation } from "framer-motion";

const Branding = () => {
  const { title } = useSiteMetadata();
  return (
    <Link to="/" className={$("text-2xl", "font-semibold", "text-text")}>
      <Logo width="32px" height="32px" />
      <span className={$("ml-4")}>{title}</span>
    </Link>
  );
};

const ColorSchemeToggle = ({ className }) => {
  const controls = useAnimation();
  const [colorScheme, setColorScheme] = useColorScheme();
  return (
    <button
      title="Toggle color mode"
      onClick={() => {
        controls.stop();
        controls.start({
          rotate: 360,
          transition: { duration: 1 },
          transitionEnd: { rotate: 0 },
        });
        setColorScheme(colorScheme === "default" ? "dark" : "default");
      }}
      className={$("a", "text-text", "focus:outline-none", "overflow:hidden", className)}
    >
      <motion.div animate={controls}>
        <FontAwesomeIcon icon={colorScheme === "default" ? ["fas", "sun"] : ["fas", "moon"]} />
      </motion.div>
    </button>
  );
};

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={$("sticky", "md:relative", "top-0", "bg-background", "md:bg-transparent", "z-10")}>
      <nav className={$("hidden", "md:flex", "justify-between", "items-center", "py-1")}>
        <Branding />
        <NavLinks className={$("ml-0", "md:ml-8", "lg:ml-12")} />
        <SocialLinks className={$("ml-auto", "mr-4", "border-r", "pr-4", "none", "lg:block")} />
        <ColorSchemeToggle className={$("ml-0")} />
      </nav>
      <div className={$("flex", "md:hidden", "flex-col", "justify-center", "items-center")}>
        <nav
          className={$(
            "flex",
            "w-full",
            "justify-between",
            "items-center",
            "transition-all",
            "duration-150",
            "ease-in",
            { invisible: showMenu },
            { "opacity-0": showMenu },
            { visible: !showMenu },
            { "opacity-100": !showMenu }
          )}
        >
          <Branding />
          <button
            aria-label="Open menu"
            onClick={() => setShowMenu(true)}
            className={$("outline-none", "text-text", "hover:text-text", "py-3")}
          >
            <FontAwesomeIcon icon={["fas", "bars"]} size="2x" />
          </button>
        </nav>
        <nav
          className={$(
            "absolute",
            "top-0",
            "left-0",
            "w-full",
            "my-4",
            "px-4",
            "bg-background",
            "rounded-lg",
            "overflow-scroll",
            "shadow-lg",
            "border",
            "transition-all",
            "duration-200",
            "ease-in",
            "transform",
            "origin-center",
            "max-h-screen",
            { visible: showMenu },
            { "opacity-100": showMenu },
            { "scale-100": showMenu },
            { invisible: !showMenu },
            { "opacity-0": !showMenu },
            { "scale-90": !showMenu }
          )}
        >
          <div className={$("flex", "justify-between", "items-center", "w-full", "py-2", "px-0")}>
            <Branding />
            <button
              aria-label="Close menu"
              onClick={() => setShowMenu(false)}
              className={$("outline-none", "text-text", "hover:text-text")}
            >
              <FontAwesomeIcon icon={["fas", "times"]} size="2x" />
            </button>
          </div>
          <NavLinks className={$("border-t")} />
          <div className={$("flex", "justify-between", "items-center", "py-4")}>
            <SocialLinks />
            <ColorSchemeToggle className={$("ml-auto")} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
