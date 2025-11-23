"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import React, { useState } from "react";
import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";
import { Branding } from "./Header";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ColorSchemeToggle = dynamic(() => import("./ColorSchemeToggle"), {
  ssr: false,
});

export default function MobileNav() {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setShowMenu(false);
  }

  return (
    <nav
      className={cn(
        "mobile",
        "flex",
        "md:hidden",
        "flex-col",
        "justify-center",
        "items-center",
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
          { "opacity-100": !showMenu },
        )}
      >
        <Branding />
        <button
          aria-label="Open menu"
          onClick={() => setShowMenu(true)}
          className={cn("outline-hidden", "text-text", "hover:text-text", "py-3")}
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
          { "scale-90": !showMenu },
        )}
      >
        <div
          className={cn(
            "flex",
            "justify-between",
            "items-center",
            "w-full",
            "py-2",
            "px-0",
          )}
        >
          <Branding />
          <button
            aria-label="Close menu"
            onClick={() => setShowMenu(false)}
            className={cn("outline-hidden", "text-text", "hover:text-text")}
          >
            <FontAwesomeIcon icon={faTimes} size="2x" className={"w-5 h-5"} />
          </button>
        </div>
        <NavLinks className={cn("border-t")} />
        <div className={cn("flex", "justify-between", "items-center", "py-4")}>
          <SocialLinks />
          <ColorSchemeToggle className={cn("ml-auto")} />
        </div>
      </div>
    </nav>
  );
}
