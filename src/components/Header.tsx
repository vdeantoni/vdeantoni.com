import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import SocialLinks from "./SocialLinks";
import dynamic from "next/dynamic";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
      <Avatar className={cn("w-10", "h-10", "border", "border-foreground", "bg-background", "actionable")}>
        <AvatarImage src="/logo.svg" alt="Stylized picture of the author" className="dark:invert" />
        <AvatarFallback>VD</AvatarFallback>
      </Avatar>
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
