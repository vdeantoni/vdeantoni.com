import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import SocialLinks from "./SocialLinks";
import dynamic from "next/dynamic";

const ColorSchemeToggle = dynamic(() => import("./ColorSchemeToggle"), {});
const NavLinks = dynamic(() => import("./NavLinks"), {});

export const Branding = () => {
  return (
    <Link
      href="/"
      className={cn(
        "branding",
        "text-2xl",
        "font-semibold",
        "text-text",
        "group",
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
          "group-hover:text-primary-hover",
          "group-hover:border-primary-hover",
          "relative",
          "group",
        )}
      >
        <Image
          src={"/logo.svg"}
          loading="eager"
          fill={true}
          alt={"Stylized picture of the author"}
          priority={true}
        />
      </div>
      <span className={cn("ml-3")}>vdeantoni.com</span>
    </Link>
  );
};

const Header = () => {
  return (
    <header
      className={cn(
        "mt-6",
        "py-2",
        "px-4",
        "z-10",
        "sticky",
        "top-2",
        "md:relative",
        "bg-background",
        "rounded",
      )}
    >
      <nav
        className={cn(
          "desktop",
          "hidden",
          "md:flex",
          "justify-between",
          "items-center",
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
            "lg:block",
          )}
        />
        <ColorSchemeToggle />
      </nav>
      <MobileNav />
    </header>
  );
};

export default Header;
