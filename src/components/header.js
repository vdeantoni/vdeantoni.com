import React, { useState } from "react";
import Logo from "../assets/svgs/logo.svg";
import { DesktopNav } from "./nav/desktop-nav";
import { MobileNav } from "./nav/mobile-nav";
import { MobileNavToggle } from "./nav/mobile-nav-toggle";

const Header = ({ title, siteUrl, contactLinks, menuLinks }) => {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-nav text-nav">
      <div className="container flex items-center justify-between h-16">
        <div className="flex-1 flex items-center">
          <a href={siteUrl} className="h-8 w-8 mr-4">
            <Logo className="h-full w-full" />
          </a>
          <div className="relative flex-1 flex items-center">
            <h1 className="hidden sm:block heading text-2xl text-shadow">
              {title}
            </h1>
          </div>

          <DesktopNav
            menuLinks={menuLinks}
            className="hidden md:block"
          ></DesktopNav>

          <MobileNavToggle
            open={open}
            setOpen={setOpen}
            className="md:hidden"
          ></MobileNavToggle>
        </div>
      </div>
      <MobileNav
        menuLinks={menuLinks}
        open={open}
        className={`${open ? "" : "hidden"} md:hidden`}
      ></MobileNav>
    </header>
  )
}

export default Header
