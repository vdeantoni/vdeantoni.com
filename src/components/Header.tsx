import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";
import dynamic from "next/dynamic";

const ColorSchemeToggle = dynamic(() => import("./ColorSchemeToggle"), {
  ssr: false,
});

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
          "group-hover:text-primaryHover",
          "group-hover:border-primaryHover",
          "relative",
          "group",
        )}
      >
        <Image
          src={"/logo.svg"}
          loading="lazy"
          fill={true}
          alt={"Stylized picture of the author"}
          className="group-hover:animate-spin"
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
        "py-2",
        "z-10",
        "sticky",
        "top-0",
        "md:relative",
        "bg-background",
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
