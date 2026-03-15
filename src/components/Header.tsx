import { cn } from "@/lib/utils";
import React from "react";
import MobileNav from "./MobileNav";
import dynamic from "next/dynamic";

const ColorSchemeToggle = dynamic(() => import("./ColorSchemeToggle"), {});
const NavLinks = dynamic(() => import("./NavLinks"), {});

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5">
      {/* Desktop floating pill nav */}
      <nav
        className={cn(
          "hidden md:flex items-center gap-1",
          "px-2 py-1.5 rounded-full",
          "nav-glass shadow-lg shadow-black/[0.03]",
        )}
      >
        <NavLinks />
        <div className="w-px h-5 bg-border mx-1" />
        <ColorSchemeToggle />
      </nav>

      {/* Mobile nav */}
      <MobileNav />
    </header>
  );
};

export default Header;
