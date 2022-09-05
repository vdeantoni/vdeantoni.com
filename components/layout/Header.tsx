import {
  faBars,
  faMoon,
  faSun,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import useColorScheme from "../../hooks/useColorScheme";
import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";

const Branding: FC = () => {
  return (
    <Link href="/">
      <a
        className={cn(
          "branding",
          "text-2xl",
          "font-semibold",
          "text-text",
          "group"
        )}
      >
        <div
          className={cn(
            "w-10",
            "h-10",
            "overflow-hidden",
            "text-black",
            "bg-white",
            "rounded-full",
            "border-black",
            "border",
            "actionable",
            "group-hover:text-primaryHover",
            "group-hover:border-primaryHover"
          )}
        >
          <Image
            src={"/logo.svg"}
            width={"100%"}
            height={"100%"}
            alt={"Stylized picture of the author"}
          />
        </div>
        <span className={cn("hidden", "md:block", "ml-3")}>vdeantoni.com</span>
      </a>
    </Link>
  );
};

const ColorSchemeToggle: FC<Partial<HTMLButtonElement>> = ({ className }) => {
  const controls = useAnimation();
  const [colorScheme, setColorScheme] = useColorScheme();

  return (
    <button
      title="Toggle color mode"
      onClick={async (e) => {
        controls.stop();
        e.currentTarget.blur();
        await controls.start({
          y: -20,
          opacity: 0,
          transition: { duration: 0.3 },
          transitionEnd: { y: 10 },
        });
        setColorScheme(colorScheme === "default" ? "dark" : "default");
        await controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        });
      }}
      className={cn("a", "text-text", "overflow:hidden", className)}
    >
      <motion.div animate={controls}>
        <FontAwesomeIcon
          icon={colorScheme === "default" ? faSun : faMoon}
          className={cn("w-5", "h-5")}
        />
      </motion.div>
    </button>
  );
};

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      className={cn("sticky", "md:relative", "top-0", "bg-transparent", "z-10")}
    >
      <nav
        className={cn(
          "desktop",
          "hidden",
          "md:flex",
          "justify-between",
          "items-center",
          "py-1"
        )}
      >
        <Branding />
        <NavLinks className={cn("ml-0", "md:ml-8", "lg:ml-12")} />
        <SocialLinks
          className={cn(
            "ml-auto",
            "mr-4",
            "border-r",
            "pr-2",
            "none",
            "lg:block"
          )}
        />
        <ColorSchemeToggle className={cn("mt-[-0.25rem]")} />
      </nav>
      <nav
        className={cn(
          "mobile",
          "flex",
          "md:hidden",
          "flex-col",
          "justify-center",
          "items-center"
        )}
      >
        <div
          className={cn(
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
            className={cn(
              "outline-none",
              "text-text",
              "hover:text-text",
              "py-3"
            )}
          >
            <FontAwesomeIcon icon={faBars} size="2x" />
          </button>
        </div>
        <div
          className={cn(
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
          <div
            className={cn(
              "flex",
              "justify-between",
              "items-center",
              "w-full",
              "py-2",
              "px-0"
            )}
          >
            <Branding />
            <button
              aria-label="Close menu"
              onClick={() => setShowMenu(false)}
              className={cn("outline-none", "text-text", "hover:text-text")}
            >
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </button>
          </div>
          <NavLinks className={cn("border-t")} />
          <div
            className={cn("flex", "justify-between", "items-center", "py-4")}
          >
            <SocialLinks />
            <ColorSchemeToggle className={cn("ml-auto")} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
