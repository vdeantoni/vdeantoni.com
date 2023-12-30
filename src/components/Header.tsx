"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";
import ColorSchemeToggle from "./ColorSchemeToggle";

const Branding: FC = () => {
  return (
    <Link
      href="/"
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
          "group-hover:border-primaryHover",
          "relative"
        )}
      >
        <Image
          src={"/logo.svg"}
          loading="lazy"
          fill={true}
          alt={"Stylized picture of the author"}
        />
      </div>
      <span className={cn("ml-3")}>vdeantoni.com</span>
    </Link>
  );
};

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={cn("relative", "py-2", "bg-transparent", "z-10")}>
      <nav
        className={cn(
          "desktop",
          "hidden",
          "md:flex",
          "justify-between",
          "items-center"
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
            <FontAwesomeIcon icon={faBars} size="2x" className={"w-5 h-5"} />
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
              <FontAwesomeIcon icon={faTimes} size="2x" className={"w-5 h-5"} />
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
